import { IChild } from "./IChild";
import { IUser } from "./IUser";
import { IUserChild } from "./IUserChild";


export interface IUserChildService {
  createRelation(user: IUser, child: IChild): Promise<IUserChild>;
  findRelation(user: IUser, child: IChild): Promise<IUserChild>;
  findRelationByIds(userId: number, childId: number): Promise<IUserChild>;
  findRelationsByParent(parentId: number): Promise<IUserChild[]>;
}