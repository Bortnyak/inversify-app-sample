import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPatch, httpPost, httpPut, requestBody, requestParam, response } from "inversify-express-utils";
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";
import { CreateChildPayload } from "../dto/CreateChildPayload";
import { IChild } from "../interfaces/IChild";
import { IChildService } from "../interfaces/IChildService";
import { ICreateChild } from "../interfaces/ICreateChild";
import { IGetChild } from "../interfaces/IGetChild";
import { IUpdateChild } from "../interfaces/IUpdateChild";
import { IUser } from "../interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";
import { ChildListResponse } from "../dto/ChildListResponse";
import { UpdateChildPayload } from "../dto/UpdateChildPayload";

export { ChildListResponse, CreateChildPayload, UpdateChildPayload }


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
    path: "/{id}",
    parameters: {
      path: {
        id: {
          description: "Child id",
          type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
          required: true
        },
      },
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "UpdateChildPayload",
        required: true,
        allowEmptyValue: false,
        description: "UpdateChildPayload object"
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
  @httpPut("/:id", ...UpdateChildPayload.validate(), TYPES.IAuthMiddleware)
  public async updateChild(
    @requestParam("id") id: number, 
    @requestBody() payload: IUpdateChild, 
    @response() res: Response,
    ) {
    const user = this.httpContext.user.details as IUser;
    await this.childService.update(user.id, id, payload);
    return res.status(200).json({ success: true });
  }


  @ApiOperationDelete({
    summary: "Delete a child object",
    description: "Delete the child object by id",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          description: "Child id",
          type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
          required: true
        },
      },
    },
    responses: {
      200: { description: "Success" },
      401: { description: "Unathorized" },
      500: { description: "Internal server error" }
    }
  })
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

  @ApiOperationGet({
    description: "Get the list of all children for authorized user",
    summary: "Get the list of all children",
    path: "/list",
    responses: {
      200: { 
        description: "The response represents an array of child objects. If there are no children - empty array returns", 
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: "ChildListResponse" 
      },
      401: { description: "Unathorized" },
      404: { description: "Session state with given sessionId not found" },
      500: { description: "Internal server error" }
    }
  })
  @httpGet("/list", TYPES.IAuthMiddleware)
  public async getChildren(@response() res: Response) {
    const user = this.httpContext.user.details as IUser;
    const children: IGetChild[] = await this.childService.findAllByParentId(user.id);
    return res.status(200).json({ success: true, children });
  }


  @ApiOperationPut({
    summary: "Set child's card or replace old one",
    description: "Set child's card",
    path: "/{id}/cards/{cardId}",
    parameters: {
      path: {
        id: {
          description: "Child id",
          type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
          required: true
        },
        cardId: {
          description: "Card id",
          type: SwaggerDefinitionConstant.Parameter.Type.INTEGER,
          required: true
        },
      },
    },
    responses: {
      200: { 
        description: "Success",
        type: SwaggerDefinitionConstant.OBJECT,
      },
      401: { description: "Unathorized" },
      404: { description: "Child or card doesn't exist" },
      500: { description: "Internal server error" },
    }
  })
  @httpPut("/:id/cards/:cardId", TYPES.IAuthMiddleware)
  public async attachCardToChild(
    @requestParam("id") childId: number,
    @requestParam("cardId") cardId: number,
    @response() res: Response,
  ) {
    const user = this.httpContext.user.details as IUser;
    await this.childService.addCard(user.id, cardId, childId);
    return res.status(200).json({ success: true });
  }

}