import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpPost, httpPut, requestBody, requestParam, response } from "inversify-express-utils";
import { IChild } from "../interfaces/IChild";
import { IChildService } from "../interfaces/IChildService";
import { ICreateChild } from "../interfaces/ICreateChild";
import { IUpdateChild } from "../interfaces/IUpdateChild";
import { IUser } from "../interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";
import TYPES from "../utils/di/identifiers";



@controller("/children")
export class ChildrenController extends BaseHttpController {
  constructor(
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.IChildService) private childService: IChildService,
  ) {
    super();
  }


  @httpPost("/", TYPES.IAuthMiddleware)
  public async createChild(@requestBody() payload: ICreateChild, @response() res: Response) {
    const user = this.httpContext.user.details as IUser;
    const childCreated: IChild = await this.childService.create(user, payload);
    return res.status(201).json({ success: true, child: childCreated });
  }


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
  public async deleteChild(@response() res: Response) {
    const user = this.httpContext.user.details as IUser;
    return res.status(201).json({ success: true });
  }

}