import { inject, injectable } from "inversify";
import { IChild } from "../interfaces/IChild";
import { IChildRepository } from "../interfaces/IChildRepository";
import { IChildService } from "../interfaces/IChildService";
import { ICreateChild } from "../interfaces/ICreateChild";
import { IGetChild } from "../interfaces/IGetChild";
import { IUpdateChild } from "../interfaces/IUpdateChild";
import { IUser } from "../interfaces/IUser";
import { IUserChild } from "../interfaces/IUserChild";
import { IUserChildService } from "../interfaces/IUserChildService";
import { dumpUsersChildren } from "../mappers/UserChildrenMapper";
import TYPES from "../utils/di/identifiers";
import { HttpException } from "../utils/HTTPExceptionHelper";
import { ILoggerService } from "../infrastructure/Logger/LoggerService";
import { ICreditCardService } from "../interfaces/ICreditCardService";


@injectable()
export class ChildService implements IChildService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IChildRepository) private childRepo: IChildRepository,
    @inject(TYPES.IUserChildService) private userChildService: IUserChildService,
    @inject(TYPES.ICreditCardService) private creditCardService: ICreditCardService,

  ) { this.loggerService.setContext(this)}


  find(id: number): Promise<IChild> {
    throw new Error("Method not implemented.");
  }


  async findAllByParentId(userId: number): Promise<IGetChild[]> {
    const usersChildren: IUserChild[] = await this.userChildService.findRelationsByParent(userId);
    return usersChildren.map(uChild => dumpUsersChildren(uChild));
  }


  async create(user: IUser, childPayload: ICreateChild): Promise<IChild> {
    const childExists = await this.childRepo.findByName(childPayload.name);
    if (childExists) {
      const errorMessage = "Child already exists";
      this.loggerService.logError(errorMessage);
      throw new HttpException(409, errorMessage);
    }
    const childCreated = await this.childRepo.create(childPayload);
    await this.userChildService.createRelation(user, childCreated);

    return childCreated;
  }


  async update(userId: number, childId: number, childPayload: IUpdateChild): Promise<void> {
    const userChildRelation = await this.userChildService.findRelationByIds(userId, childId);
    if (!userChildRelation) {
      const errorMessage = "Current user doesn't relate to the child";
      this.loggerService.logError(errorMessage);
      throw new HttpException(403, errorMessage);
    }

    await this.childRepo.update(childId, childPayload);
    return;
  }


  async delete(userId: number, childId: number,): Promise<void> {
    const userChildRelation = await this.userChildService.findRelationByIds(userId, childId);
    if (!userChildRelation) {
      const errorMessage = "Current user doesn't relate to the child";
      this.loggerService.logError(errorMessage);
      throw new HttpException(403, errorMessage);
    }

    await this.childRepo.delete(childId);
  }


  async addCard(userId:number, cardId: number, childId: number): Promise<void> {
    const creditCard = await this.creditCardService.findByIdAndOwner(cardId, userId);
    if (!creditCard) {
      const errorMessage = "Credit card doesn't exist";
      this.loggerService.logError(errorMessage);
      throw new HttpException(404, errorMessage);
    }

    const child = await this.childRepo.findById(childId);
    if (!child) {
      const errorMessage = "Child doesn't exist";
      this.loggerService.logError(errorMessage);
      throw new HttpException(404, errorMessage);
    }

    await this.childRepo.updateCard(childId, creditCard);
    return;
  }

  
}