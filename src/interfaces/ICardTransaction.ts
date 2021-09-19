import { ICreditCard } from "./ICreditCard";

export enum transactionStatuses {
  pending = "PENDING",
  success = "SUCCESS",
  failure = "FAILURE",
};


export interface ICardTransaction {
  id: bigint,
  card: ICreditCard,
  amount: bigint,
  status: transactionStatuses,
  createdAt: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}