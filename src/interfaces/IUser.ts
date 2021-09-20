import { IUserChild } from "./IUserChild";

export interface IUser {
  id: bigint,
  name: string, 
  email: string,
  password: string,
  createdAt: Date,
  children: IUserChild[],
  updatedAt?: Date,
}