import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, requestBody, response } from "inversify-express-utils";
import { IAuthService } from "../interfaces/IAuthService";
import { ICreateUser } from "../interfaces/ICreateUser";
import { IGetUserMapper } from "../interfaces/IGetUserMapper";
import { ILogin } from "../interfaces/ILogin";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";


@controller("/auth")
export class AuthController extends BaseHttpController{
  constructor(
    @inject(TYPES.IAuthService) private authService: IAuthService,
    @inject(TYPES.IUserService) private userService: IUserService,
  ) { super(); }


  @httpPost("/login")
  async login(@requestBody() loginPayload: ILogin, @response() res: Response) {
    const token = await this.authService.login(loginPayload);
    return res.status(200).json({ success: true, token });
  }


  @httpPost("/signup")
  public async createUser(@requestBody() payload: ICreateUser, @response() res: Response) {
    const userCreated: IGetUserMapper = await this.userService.register(payload);
    return res.status(201).json({ success: true, user: userCreated });
  }

}