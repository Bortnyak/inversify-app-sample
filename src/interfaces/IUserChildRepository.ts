import { IChild } from "./IChild";
import { IRepository } from "./IRepository";
import { IUser } from "./IUser";
import { IUserChild } from "./IUserChild";


export interface IUserChildRepository extends IRepository<IUserChild> {
  createRelation(user: IUser, child: IChild): Promise<IUserChild>;
  findRelation(user: IUser, child: IChild): Promise<IUserChild>;
}