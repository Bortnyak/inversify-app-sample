import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, requestBody, response } from "inversify-express-utils";
import { ApiOperationPost, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";
import { IAuthService } from "../interfaces/IAuthService";
import { ICreateUser } from "../interfaces/ICreateUser";
import { IGetUserMapper } from "../interfaces/IGetUserMapper";
import { ILogin } from "../interfaces/ILogin";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";
import { LoginPayload } from "../dto/LoginPayload";
import { RegisterPayload } from "../dto/RegisterPayload";

export { LoginPayload, RegisterPayload }

@ApiPath({
  path: "/auth",
  name: "Auth",
})
@controller("/auth")
export class AuthController extends BaseHttpController{
  constructor(
    @inject(TYPES.IAuthService) private authService: IAuthService,
    @inject(TYPES.IUserService) private userService: IUserService,
  ) { super(); }


  @ApiOperationPost({
    summary: "Issue jwt token",
    description: "Issue jwt token",
    path: "/login",
    parameters: {
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "LoginPayload",
        required: true,
        allowEmptyValue: false,
        description: "CreateChildPayload object"
      },
    },
    responses: {
      200: { 
        description: "Success",
        type: SwaggerDefinitionConstant.OBJECT,
      },
      400: { description: "Parameters fail" },
      403: { description: "Wrong password" },
      404: { description: "User with given email not found" },
      500: { description: "Internal server error" }
    }
  })
  @httpPost("/login")
  async login(@requestBody() loginPayload: ILogin, @response() res: Response) {
    const token = await this.authService.login(loginPayload);
    return res.status(200).json({ success: true, token });
  }


  @ApiOperationPost({
    summary: "Register new user",
    description: "Register new user",
    path: "/signup",
    parameters: {
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "RegisterPayload",
        required: true,
        allowEmptyValue: false,
        description: "Users data"
      },
    },
    responses: {
      200: { 
        description: "Success",
        type: SwaggerDefinitionConstant.OBJECT,
      },
      400: { description: "Parameters fail" },
      409: { description: "User already exists" },
      500: { description: "Internal server error" }
    }
  })
  @httpPost("/signup")
  public async createUser(@requestBody() payload: ICreateUser, @response() res: Response) {
    const userCreated: IGetUserMapper = await this.userService.register(payload);
    return res.status(201).json({ success: true, user: userCreated });
  }

}