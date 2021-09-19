import { injectable, inject } from "inversify";

import { IUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";
import { ILoggerService } from "./LoggerService";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) { this.loggerService.setContext(this) }


  async find(id: bigint): Promise<IUser> {
    return await this.userRepo.find(id)
  }
  
}