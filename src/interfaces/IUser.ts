import { IUserChild } from "./IUserChild";

export interface IUser {
  id: number,
  name: string, 
  email: string,
  password: string,
  createdAt: Date,
  children: IUserChild[],
  updatedAt?: Date,
}