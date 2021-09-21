import { IUser } from "./IUser";

export interface ICreditCardToSave {
  type: string,
  cardNumber: number, 
  securityCode: number,
  expYear: number,
  expMonth: number,
  monthLimit: number,
  owner: IUser,
}