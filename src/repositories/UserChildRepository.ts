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

  
  find(id: string | bigint): Promise<IUserChild> {
    throw new Error("Method not implemented.");
  }
  
  
  findAll(): Promise<IUserChild[]> {
    throw new Error("Method not implemented.");
  }
  
}