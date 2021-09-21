import { injectable, inject } from "inversify";
import { randomBytes, scrypt } from "crypto";

import TYPES from "../utils/di/identifiers";

import { ICreateUser } from "../interfaces/ICreateUser";
import { IUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import { HttpException } from "../utils/HTTPExceptionHelper";
import { ILoggerService } from "./LoggerService";
import { dumpUser } from "../mappers/UserMappers";
import { IGetUserMapper } from "../interfaces/IGetUserMapper";


@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) { this.loggerService.setContext(this) }


  async findByEmailWithPassword(email: string): Promise<IUser> {
    return await this.userRepo.findByEmailWithPassword(email);
  }


  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(8).toString("hex")
      scrypt(password, salt, 64, (err, derivedKey) => {
          if (err) reject(err);
          resolve(salt + ":" + derivedKey.toString('hex'))
      });
    });
  }

  
  async verifyPassword(password: string, hash: string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":")
      scrypt(password, salt, 64, (err, derivedKey) => {
          if (err) reject(err);
          resolve(key == derivedKey.toString('hex'))
      });
    })
  }


  async find(id: number): Promise<IUser> {
    return await this.userRepo.findById(id);
  }


  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepo.findByEmail(email);
  }


  async register(payload: ICreateUser): Promise<IGetUserMapper> {
    const userExists = await this.findByEmail(payload.email);
    console.log("userExists: ", userExists);
    if (userExists) {
      const errorMessage = "User already exists";
      this.loggerService.logError(errorMessage);
      throw new HttpException(409, errorMessage);
    }
    payload.password = await this.hashPassword(payload.password);
    console.log("payload: ", payload);

    const userCreated = await this.userRepo.create(payload);
    return dumpUser(userCreated);
  }

  
}