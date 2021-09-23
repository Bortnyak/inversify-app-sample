import { ICreateCreditCard } from "./ICreateCreditCard";
import { ICreditCard } from "./ICreditCard";
import { IUpdateCreditCard } from "./IUpdateCreditCard";
import { IUser } from "./IUser";

export interface ICreditCardService {
  addCard(user: IUser, cardPayload: ICreateCreditCard): Promise<void>;
  deleteCard(cardId: number, user: IUser): Promise<void>;
  updateMonthLimit(cardId: number, user: IUser, updateCardPayload: IUpdateCreditCard): Promise<void>;
  findByIdAndOwner(id: number, ownerId: number): Promise<ICreditCard>;
  makePayment(id: number, ownerId: number, amount: number): Promise<void>;
}