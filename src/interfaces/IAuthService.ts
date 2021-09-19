import { ICreateUser } from "./ICreateUser";
import { ILogin } from "./ILogin";
import { IUser } from "./IUser";


export interface IAuthService {
  login(payload: ILogin): Promise<void>;
  // generateToken(user: IUser): Promise<string>;
  // verifyToken(token: string): Promise<boolean>;
}