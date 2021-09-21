import { injectable, inject } from "inversify";
import { IChild } from "../interfaces/IChild";
import { IUser } from "../interfaces/IUser";
import { IUserChild } from "../interfaces/IUserChild";
import { IUserChildRepository } from "../interfaces/IUserChildRepository";
import { IUserChildService } from "../interfaces/IUserChildService";
import TYPES from "../utils/di/identifiers";
import { ILoggerService } from "./LoggerService";

@injectable()
export class UserChildService implements IUserChildService {
  constructor(
    @inject(TYPES.IUserChildRepository) private userChildRepo: IUserChildRepository,
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
  ) { this.loggerService.setContext(this) }


  async createRelation(user: IUser, child: IChild): Promise<IUserChild> {
    return await this.userChildRepo.createRelation(user, child);
  }

  async findRelation(user: IUser, child: IChild): Promise<IUserChild> {
    return await this.userChildRepo.findRelation(user, child);
  }

  async findRelationByIds(userId: number, childId: number): Promise<IUserChild> {
    return await this.userChildRepo.findRelationByIds(userId, childId);
  }
  
}

