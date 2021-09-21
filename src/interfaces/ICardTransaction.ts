import { ICreditCard } from "./ICreditCard";

export enum transactionStatuses {
  pending = "PENDING",
  success = "SUCCESS",
  failure = "FAILURE",
};


export interface ICardTransaction {
  id: number,
  card: ICreditCard,
  amount: number,
  status: transactionStatuses,
  createdAt: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}