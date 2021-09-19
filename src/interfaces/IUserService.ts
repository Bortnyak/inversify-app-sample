import { IUser } from "./IUser";


export interface IUserService {
  find(id: bigint): Promise<IUser>;
}