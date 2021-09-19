import { IRole } from "./IRole";

export interface IUser {
  id: bigint,
  name: string, 
  email: string,
  role: IRole,
  createdAt: Date,
  children?: IUser[],
  updatedAt?: Date,
  deletedAt?: Date,
}