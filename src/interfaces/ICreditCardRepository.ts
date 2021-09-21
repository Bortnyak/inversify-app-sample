import { DeleteResult, UpdateResult } from "typeorm";
import { IRepository } from "../repositories/Repository";
import { ICreateCreditCard } from "./ICreateCreditCard";
import { ICreditCard } from "./ICreditCard";



export interface ICreditCardRepository extends IRepository<ICreditCard> {
  createCreditCard(card: ICreateCreditCard): Promise<ICreditCard>;
  findByIdAndOwner(cardId: number, owner: number): Promise<ICreditCard>;
  updateMonthLimit(cardId: number, monthLimit: number): Promise<UpdateResult>;
  deleteCreditCard(cardId: number): Promise<DeleteResult>;
}