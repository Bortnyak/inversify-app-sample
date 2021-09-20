import { IChild } from "./IChild";
import { IUser } from "./IUser";

export interface IUserChild {
  id: bigint,
  user: IUser,
  child: IChild,
  createdAt: Date,
}