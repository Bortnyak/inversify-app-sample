import { ICreditCard } from "./ICreditCard";

export interface IChild {
  id: number,
  name: string,
  age: number,
  createdAt: Date,
  creditCard?: ICreditCard,
  updatedAt?: Date,
}