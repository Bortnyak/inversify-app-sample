import { ICreditCard } from "./ICreditCard";

export enum TransactionStatus {
  pending = "PENDING",
  success = "SUCCESS",
  failure = "FAILURE",
};


export interface IPaymentTransaction {
  id: number,
  card: ICreditCard,
  amount: number,
  status: TransactionStatus,
  createdAt: Date,
}
