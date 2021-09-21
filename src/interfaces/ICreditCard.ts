import { IUser } from "./IUser";

export interface ICreditCard {
  id: number,
  type: string,
  cardNumber: number, 
  securityCode: number,
  expYear: number,
  expMonth: number,
  monthLimit: number,
  owner: IUser,
  createdAt?: Date,
  updatedAt?: Date,
}