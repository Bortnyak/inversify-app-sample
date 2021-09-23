import { inject, injectable } from "inversify";
import { IAuthService } from "../interfaces/IAuthService";
import { ILogin } from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";
import { HttpException } from "../utils/HTTPExceptionHelper";
import { sign, verify,JwtPayload } from "jsonwebtoken";
import config from "../config";
import { ILoggerService } from "../infrastructure/Logger/LoggerService";


@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IUserService) private userService: IUserService,
  ) { this.loggerService.setContext(this) }


  private generateToken(user: IUser): string {
    return sign({ id: user.id }, config.jwtSecret, { expiresIn: config.jwtExpireTime });
  }


  verifyToken(token: string): string | JwtPayload {
    return verify(token, config.jwtSecret);
  }


  async login(payload: ILogin): Promise<string> {
    const user = await this.userService.findByEmailWithPassword(payload.email);
    if (!user) {
      const errorMessage = "User with given email not found";
      this.loggerService.logError(errorMessage);
      throw new HttpException(404, errorMessage);
    }

    const isPasswordMatch = await this.userService.verifyPassword(payload.password, user.password);
    if (!isPasswordMatch) {
      const errorMessage = "Wrong password";
      this.loggerService.logError(errorMessage);
      throw new HttpException(403, errorMessage);
    }

    return this.generateToken(user);
  }





}