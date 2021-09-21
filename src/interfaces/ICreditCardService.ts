import { ICreateCreditCard } from "./ICreateCreditCard";
import { IUpdateCreditCard } from "./IUpdateCreditCard";
import { IUser } from "./IUser";

export interface ICreditCardService {
  addCard(user: IUser, cardPayload: ICreateCreditCard): Promise<void>;
  deleteCard(cardId: number, user: IUser): Promise<void>;
  updateMonthLimit(cardId: number, user: IUser, updateCardPayload: IUpdateCreditCard): Promise<void>;
}