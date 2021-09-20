import { ICreateUser } from "./ICreateUser";
import { ILogin } from "./ILogin";
import { IUser } from "./IUser";
import jwt from "jsonwebtoken";



export interface IAuthService {
  login(payload: ILogin): Promise<string>;
  // generateToken(user: IUser): Promise<string>;
  verifyToken(token: string): string | jwt.JwtPayload;
}