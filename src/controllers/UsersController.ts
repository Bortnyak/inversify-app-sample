import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, requestBody, response } from "inversify-express-utils";
import { ICreateUser } from "../interfaces/ICreateUser";
import { IGetUserMapper } from "../interfaces/IGetUserMapper";
import { IUserService } from "../interfaces/IUserService";
import { dumpUser } from "../mappers/UserMappers";
import TYPES from "../utils/di/identifiers";


@controller("/users")
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.IUserService) private userService: IUserService,
  ) {
    super();
  }


  @httpPost("/", /*TYPES.IAuthMiddleware*/)
  public async createUser(@requestBody() payload: ICreateUser, @response() res: Response) {
    let userCreated: IGetUserMapper;
    try {
      userCreated = await this.userService.register(payload);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message })
    }

    return res.status(201).json({ success: true, user: userCreated });
  }


  @httpGet("/profile", TYPES.IAuthMiddleware)
  public async getProfile(@response() res: Response) {
    return res.status(200).json({ success: true, user: dumpUser(this.httpContext.user.details) });
  }


}