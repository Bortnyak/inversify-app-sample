import { IRepository } from "../repositories/Repository";
import { IUser } from "./IUser";


export interface IUserRepository extends IRepository<IUser> {
  find(id: bigint): Promise<IUser>;
}