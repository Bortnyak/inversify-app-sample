import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, requestBody, response } from "inversify-express-utils";
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";
import { ICreateUser } from "../interfaces/ICreateUser";
import { IGetUserMapper } from "../interfaces/IGetUserMapper";
import { IUserService } from "../interfaces/IUserService";
import { dumpUser } from "../mappers/UserMappers";
import TYPES from "../utils/di/identifiers";


@ApiPath({
  path: "/users",
  name: "Users resource",
  security: {
    BearerAuth: []
  }
})
@controller("/users")
export class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.IUserService) private userService: IUserService,
  ) {
    super();
  }
  

  @ApiOperationGet({
    description: "Get own users profile",
    summary: "Get own users profile",
    path: "/profile",
    responses: {
      200: { 
        description: "The response represents an users objects", 
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
      },
      401: { description: "Unathorized" },
      404: { description: "Session state with given sessionId not found" },
      500: { description: "Internal server error" }
    }
  })
  @httpGet("/profile", TYPES.IAuthMiddleware)
  public async getProfile(@response() res: Response) {
    return res.status(200).json({ success: true, user: dumpUser(this.httpContext.user.details) });
  }


}