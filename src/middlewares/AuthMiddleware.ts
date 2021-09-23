import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { ParsedQs } from "qs";
import { IAuthService } from "../interfaces/IAuthService";
import { IUser } from "../interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";
import { ILoggerService } from "../infrastructure/Logger/LoggerService";
import { Principal } from "../services/PrincipalService";
import TYPES from "../utils/di/identifiers";
import { JWTHelper } from "../utils/JwtHelper";


export interface IAuthMiddleware {
  handler(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): 
  Promise<unknown>;
}


@injectable()
export class AuthMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IAuthService) private authService: IAuthService,
    @inject(TYPES.IUserService) private userService: IUserService,
  ) {
    super();
  }


  async handler(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<unknown> {
    const jwtHelper = new JWTHelper(req);
    let token: string;
    try {
      token = jwtHelper.getToken();
    } catch (e) {
      const error = "Failed to obtain token";
      this.loggerService.logError(error, e);
      return res.status(401).json({ success: false, error });
    }

    let userData;
    try {
      userData = this.authService.verifyToken(token);
    } catch (e) {
      const error = "Token expired";
      this.loggerService.logError(error, e);
      return res.status(401).json({ success: false, error });
    }
    
    const user: IUser = await this.userService.find(userData["id"]);
    if (!user) {
      const error = "User doesn't exists";
      this.loggerService.logError(error);
      return res.status(404).json({ success: false, error });
    }
    
    this.httpContext.user = new Principal(user);
    next();
  }

}