import { ICard } from "./ICard";

export enum transactionStatuses {
  pending = "PENDING",
  success = "SUCCESS",
  failure = "FAILURE",
};


export interface ICardTransaction {
  id: bigint,
  card: ICard,
  amount: bigint,
  status: transactionStatuses,
  createdAt: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}