import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPatch, httpPost, httpPut, requestBody, requestParam, response } from "inversify-express-utils";
import { ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";
import { CreateChildPayload } from "../dto/CreateChildPayload";
import { IChild } from "../interfaces/IChild";
import { IChildService } from "../interfaces/IChildService";
import { ICreateChild } from "../interfaces/ICreateChild";
import { IGetChild } from "../interfaces/IGetChild";
import { IUpdateChild } from "../interfaces/IUpdateChild";
import { IUser } from "../interfaces/IUser";
import { IUserChild } from "../interfaces/IUserChild";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";


@ApiPath({
  path: "/children",
  name: "Children resource",
  security: {
    BearerAuth: []
  }
})
@controller("/children")
export class ChildrenController extends BaseHttpController {
  constructor(
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.IChildService) private childService: IChildService,
  ) {
    super();
  }


  @ApiOperationPost({
    summary: "Create new child object",
    description: "Create new child object",
    path: "/",
    parameters: {
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "CreateChildPayload",
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
      401: { description: "Unathorized" },
      500: { description: "Internal server error" }
    }
  })
  @httpPost("/", ...CreateChildPayload.validate(), TYPES.IAuthMiddleware)
  public async createChild(@requestBody() payload: ICreateChild, @response() res: Response) {
    const user = this.httpContext.user.details as IUser;
    const childCreated: IChild = await this.childService.create(user, payload);
    return res.status(201).json({ success: true, child: childCreated });
  }


  @ApiOperationPut({
    summary: "Update child by id",
    description: "Update child by id",
    path: "/",
    parameters: {
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "CreateChildPayload",
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
      401: { description: "Unathorized" },
      500: { description: "Internal server error" }
    }
  })
  @httpPut("/:id", TYPES.IAuthMiddleware)
  public async updateChild(
    @requestParam("id") id: number, 
    @requestBody() payload: IUpdateChild, 
    @response() res: Response,
    ) {
    const user = this.httpContext.user.details as IUser;
    await this.childService.update(user.id, id, payload);
    return res.status(200).json({ success: true });
  }


  @httpDelete("/:id", TYPES.IAuthMiddleware)
  public async deleteChild(
    @requestParam("id") id: number,
    @response() res: Response,
    ) {
    const user = this.httpContext.user.details as IUser;
    await this.childService.delete(user.id, id);
    return res.status(200).json({ success: true });
  }

  // Here could be also an endpoint for getting child by id

  @httpGet("/list", TYPES.IAuthMiddleware)
  public async getChildren(@response() res: Response) {
    const user = this.httpContext.user.details as IUser;
    const children: IGetChild[] = await this.childService.findAllByParentId(user.id);
    return res.status(200).json({ success: true, children });
  }

}