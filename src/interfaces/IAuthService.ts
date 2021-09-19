import { ICreateUser } from "./ICreateUser";
import { ILogin } from "./ILogin";


export interface IAuthService {
  login(payload: ILogin): Promise<void>;
  register(payload: ICreateUser): Promise<void>;
}