import { ICreateUser } from "./ICreateUser";
import { IGetUserMapper } from "./IGetUserMapper";
import { IUser } from "./IUser";


export interface IUserService {
  find(id: bigint): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  register(userPayload: ICreateUser): Promise<IGetUserMapper>;
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hash: string):Promise<boolean>;
  findByEmailWithPassword(email: string): Promise<IUser>;
}