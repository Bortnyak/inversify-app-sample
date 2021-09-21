import { IChild } from "./IChild";
import { IUser } from "./IUser";

export interface IUserChild {
  id: number,
  user: IUser,
  child: IChild,
  createdAt: Date,
}