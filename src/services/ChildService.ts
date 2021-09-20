import { inject, injectable } from "inversify";
import { IChild } from "../interfaces/IChild";
import { IChildRepository } from "../interfaces/IChildRepository";
import { IChildService } from "../interfaces/IChildService";
import { ICreateChild } from "../interfaces/ICreateChild";
import { IUser } from "../interfaces/IUser";
import { IUserChildService } from "../interfaces/IUserChildService";
import TYPES from "../utils/di/identifiers";
import { HttpException } from "../utils/HTTPExceptionHelper";
import { ILoggerService } from "./LoggerService";


@injectable()
export class ChildService implements IChildService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IChildRepository) private childRepo: IChildRepository,
    @inject(TYPES.IUserChildService) private userChildService: IUserChildService,

  ) { this.loggerService.setContext(this)}


  find(id: bigint): Promise<IChild> {
    throw new Error("Method not implemented.");
  }


  async findAllByParentId(userId: bigint): Promise<IChild[]> {
    throw new Error("Method not implemented.");
  }


  async create(user: IUser, childPayload: ICreateChild): Promise<IChild> {
    const childExists = await this.childRepo.findByName(childPayload.name);
    if (childExists) {
      const errorMessage = "Child already exists";
      this.loggerService.logError(errorMessage);
      throw new HttpException(409, errorMessage);
    }
    console.log("childExists: ", childExists);
    const childCreated = await this.childRepo.create(childPayload);

    // const isRelationExists = await this.userChildService.findRelation(user, childCreated);
    // if (isRelationExists) {
    //   const errorMessage = "Child already exists";
    //   this.loggerService.logError(errorMessage);
    //   throw new HttpException(403, errorMessage);
    // }

    await this.userChildService.createRelation(user, childCreated);

    return childCreated;
  }


  update(id: bigint, childPayload: ICreateChild): Promise<IChild> {
    throw new Error("Method not implemented.");
  }


  delete(id: bigint): Promise<void> {
    throw new Error("Method not implemented.");
  }


  addCard(cardId: bigint, childId: bigint): Promise<void> {
    throw new Error("Method not implemented.");
  }

  
}