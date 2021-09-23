import { ICreditCard } from "./ICreditCard";
import { TransactionStatus } from "./IPaymentTransaction";

export interface  ICreatePaymentTransaction {
  card: ICreditCard,
  amount: number,
  status: TransactionStatus,
}