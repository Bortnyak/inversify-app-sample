import { IRepository } from "../repositories/Repository";
import { ICreateUser } from "./ICreateUser";
import { IUser } from "./IUser";


export interface IUserRepository extends IRepository<IUser> {
  find(id: number): Promise<IUser>;
  findById(id: bigint): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  create(userPayload: ICreateUser): Promise<IUser>;
  findByEmailWithPassword(email: string): Promise<IUser>;
}