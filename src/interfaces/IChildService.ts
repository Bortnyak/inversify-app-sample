import { IChild } from "./IChild";
import { ICreateChild } from "./ICreateChild";
import { IGetChild } from "./IGetChild";
import { IUpdateChild } from "./IUpdateChild";
import { IUser } from "./IUser";
import { IUserChild } from "./IUserChild";


export interface IChildService {
  find(id: number): Promise<IChild>;
  create(user: IUser, childPayload: ICreateChild): Promise<IChild>;
  update(userId: number, childId: number, childPayload: IUpdateChild): Promise<void>
  delete(userId: number, childId: number,): Promise<void>
  addCard(cardId: number, childId: number): Promise<void>;
  findAllByParentId(userId: number): Promise<IGetChild[]>;
}