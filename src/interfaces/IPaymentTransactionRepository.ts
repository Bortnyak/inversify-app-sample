import { IRepository } from "../repositories/Repository";
import { ICreatePaymentTransaction } from "./ICreatePaymentTransaction";
import { IPaymentTransaction } from "./IPaymentTransaction";

export interface IPaymentTransactionRepository extends IRepository<IPaymentTransaction>{
  save(paymentTransaction: ICreatePaymentTransaction): Promise<IPaymentTransaction>;
}