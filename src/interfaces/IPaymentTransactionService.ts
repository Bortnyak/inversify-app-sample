import { ICreatePaymentTransaction } from "./ICreatePaymentTransaction";
import { IPaymentTransaction } from "./IPaymentTransaction";

export interface IPaymentTransactionService {
  commit(paymentTransaction: ICreatePaymentTransaction): Promise<IPaymentTransaction>;
}