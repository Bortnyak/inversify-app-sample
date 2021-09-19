import { IAuthService } from "../interfaces/IAuthService";
import { ICreateUser } from "../interfaces/ICreateUser";
import { ILogin } from "../interfaces/ILogin";


export class AuthService implements IAuthService {

  login(payload: ILogin): Promise<void> {
    throw new Error("Method not implemented.");
  }

}