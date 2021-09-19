import { injectable, inject } from "inversify";
import { ICreateUser } from "../interfaces/ICreateUser";

import { IUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";
import { HttpException } from "../utils/HTTPExceptionHelper";
import { ILoggerService } from "./LoggerService";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) { this.loggerService.setContext(this) }


  async find(id: bigint): Promise<IUser> {
    return await this.userRepo.findById(id);
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepo.findByEmail(email);
  }

  async register(payload: ICreateUser): Promise<IUser> {
    const userExists = await this.findByEmail(payload.email);
    if (userExists) {
      throw new HttpException(403, "User already exists")
    }

    return await this.userRepo.create(payload);
  }
  
}