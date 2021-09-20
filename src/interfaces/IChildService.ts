import { IChild } from "./IChild";
import { ICreateChild } from "./ICreateChild";
import { IUser } from "./IUser";


export interface IChildService {
  find(id: bigint): Promise<IChild>;
  findAllByParentId(userId: bigint): Promise<IChild[]>;
  create(user: IUser, childPayload: ICreateChild): Promise<IChild>;
  update(id: bigint, childPayload: ICreateChild): Promise<IChild>;
  delete(id: bigint): Promise<void>;
  addCard(cardId: bigint, childId: bigint): Promise<void>;
  // chargeCard()
}