import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, requestBody, response } from "inversify-express-utils";
import { IAuthService } from "../interfaces/IAuthService";
import { ILogin } from "../interfaces/ILogin";
import TYPES from "../utils/di/identifiers";


@controller("/auth")
export class AuthController extends BaseHttpController{
  constructor(
    @inject(TYPES.IAuthService) private authService: IAuthService,
  ) { super(); }


  @httpPost("/", /*TYPES.IAuthMiddleware*/)
  async login(@requestBody() payload: ILogin, @response() res: Response) {
    const token = await this.authService.login(payload);
    return res.status(200).json({ success: true, token });
  }
}