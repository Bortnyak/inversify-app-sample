import { ICreateUser } from "./ICreateUser";
import { IUser } from "./IUser";


export interface IUserService {
  find(id: bigint): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  register(userPayload: ICreateUser): Promise<IUser>
}