import { IChild } from "../interfaces/IChild";
import { IUser } from "../interfaces/IUser";
import { IUserChild } from "../interfaces/IUserChild";
import { IUserChildRepository } from "../interfaces/IUserChildRepository";
import { UserChild } from "../models/UserChild";
import { CatchError } from "../utils/CatchWrapper";
import { RepositoryDAO } from "./Repository";


export class UserChildRepository extends RepositoryDAO<IUserChild> implements IUserChildRepository {
  
  @CatchError("Failed to find relation between user and child")
  async findRelation(user: IUser, child: IChild): Promise<IUserChild> {
    const repo = await this._getRepository(UserChild);
    return repo.createQueryBuilder("userChild")
      .where("userChild.user = :user", { user })
      .andWhere("userChild.child = :child", { child })
      .getOne();
  }
  
  @CatchError("Failed to create relation between user and child")
  async createRelation(user: IUser, child: IChild): Promise<IUserChild> {
    const repo = await this._getRepository(UserChild);
    return repo.save({ user, child });
  }

  
  find(id: string | number): Promise<IUserChild> {
    throw new Error("Method not implemented.");
  }
  
  
  findAll(): Promise<IUserChild[]> {
    throw new Error("Method not implemented.");
  }
  
  async findRelationByIds(userId: number, childId: number): Promise<IUserChild> {
    const repo = await this._getRepository(UserChild);
    return repo.createQueryBuilder("userChild")
      .where("userChild.user = :userId", { userId })
      .andWhere("userChild.child = :childId", { childId })
      .getOne()
  }

  @CatchError("Failed to find children by parent")
  async findRelationsByParent(parentId: number): Promise<IUserChild[]> {
    const repo = await this._getRepository(UserChild);
    return repo.createQueryBuilder("userChild")
      .innerJoinAndSelect("userChild.child", "child")
      .addSelect("child.name, child.age")
      .leftJoinAndSelect("child.creditCard", "creditCard")
      .where("userChild.user = :parentId", { parentId })
      .getMany();
  }
}