import { IChild } from "./IChild";
import { ICreateChild } from "./ICreateChild";
import { IUpdateChild } from "./IUpdateChild";
import { IUser } from "./IUser";


export interface IChildService {
  find(id: number): Promise<IChild>;
  findAllByParentId(userId: number): Promise<IChild[]>;
  create(user: IUser, childPayload: ICreateChild): Promise<IChild>;
  update(userId: number, childId: number, childPayload: IUpdateChild): Promise<void>
  delete(id: number): Promise<void>;
  addCard(cardId: number, childId: number): Promise<void>;
  // chargeCard()
}