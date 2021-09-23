import { BaseHttpController, controller, httpDelete, httpPatch, httpPost, requestBody, requestParam, response } from "inversify-express-utils";
import { Response } from "express";
import { inject } from "inversify";
import TYPES from "../utils/di/identifiers";
import { ICreateCreditCard } from "../interfaces/ICreateCreditCard";
import { ICreditCardService } from "../interfaces/ICreditCardService";
import { CreateCreditCardPayload } from "../dto/CreateCreditCardPayload";
import { IUpdateCreditCard } from "../interfaces/IUpdateCreditCard";
import {
  ApiPath,
  SwaggerDefinitionConstant,
  ApiOperationPost,
  ApiOperationPatch,
  ApiOperationDelete
} from "swagger-express-ts";
import { IUser } from "../interfaces/IUser";
import { UpdateCreditCardPayload } from "../dto/UpdateCreditCardPayload";
import { ICreatePayment } from "../interfaces/ICreatePayment";

import { PaymentPayload } from "../dto/PaymentPayload";

export { PaymentPayload, CreateCreditCardPayload, UpdateCreditCardPayload }


@ApiPath({
  path: "/cards",
  name: "Cards resource",
  security: {
    BearerAuth: []
  }
})
@controller("/cards")
export class CardsController extends BaseHttpController {
  constructor(
    @inject(TYPES.ICreditCardService) private creditCardService: ICreditCardService,
  ) {
    super();
  }


  @ApiOperationPost({
    summary: "Create a card",
    description: "Create a credit card and bind it to child",
    path: "/",
    parameters: {
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "CreateCreditCardPayload",
        required: true,
        allowEmptyValue: false,
        description: "CreateCreditCardPayload object"
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
  @httpPost("/", TYPES.IAuthMiddleware, ...CreateCreditCardPayload.validate(), TYPES.CatchValidationError)
  public async addCard(
    @requestBody() cardPayload: ICreateCreditCard,
    @response() res: Response,
  ) {
    const user = this.httpContext.user.details as IUser;
    await this.creditCardService.addCard(user, cardPayload);
    return res.status(201).json({ success: true });
  }


  @ApiOperationPatch({
    summary: "Update a credit card, set new month limit",
    description: "Update a credit card",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "Card id",
          type: SwaggerDefinitionConstant.INTEGER,
          required: true
        },
      },
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "UpdateCreditCardPayload",
        required: true,
        allowEmptyValue: false,
        description: "UpdateCreditCardPayload object"
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
  @httpPatch("/:id", TYPES.IAuthMiddleware, ...UpdateCreditCardPayload.validate(), TYPES.CatchValidationError)
  public async updateMonthLimit(
    @requestParam("id") id: number,
    @requestBody() cardPayload: IUpdateCreditCard,
    @response() res: Response,
  ) {
    const user = this.httpContext.user.details as IUser;
    await this.creditCardService.updateMonthLimit(id, user, cardPayload);
    return res.status(200).json({ success: true });
  }


  @ApiOperationDelete({
    description: "Delete credit card",
    summary: "Delete credit card",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "Card id",
          type: SwaggerDefinitionConstant.INTEGER,
          required: true
        }
      }
    },
    responses: {
      200: { description: "Success" },
      401: { description: "Unathorized" },
      404: { description: "Not found" },
      500: { description: "Internal server error" }
    }
  })
  @httpDelete("/:id", TYPES.IAuthMiddleware)
  public async deleteCard(
    @requestParam("id") id: number,
    @response() res: Response,
  ) {
    const user = this.httpContext.user.details as IUser;
    await this.creditCardService.deleteCard(id, user);
    return res.status(200).json({ success: true });
  }


  @ApiOperationPost({
    summary: "Charge the card",
    description: "Charge the card",
    path: "/{:id}/payment",
    parameters: {
      body: {
        type: SwaggerDefinitionConstant.Parameter.Type.OBJECT,
        model: "PaymentPayload",
        required: true,
        allowEmptyValue: false,
        description: "PaymentPayload object"
      },
    },
    responses: {
      200: { 
        description: "Success",
        type: SwaggerDefinitionConstant.OBJECT,
      },
      400: { description: "Parameters fail" },
      401: { description: "Unathorized" },
      402: { description: "Month limit exceeded" },
      500: { description: "Internal server error" }
    }
  })
  @httpPost("/:id/payment", TYPES.IAuthMiddleware, ...PaymentPayload.validate(), TYPES.CatchValidationError)
  public async chargeOwnCard(
    @requestParam("id") id: number,
    @requestBody() paymentPayload: ICreatePayment,
    @response() res: Response,
  ) {
    const user = this.httpContext.user.details as IUser;
    await this.creditCardService.makePayment(id, user.id, paymentPayload.amount);
    return res.status(200).json({ success: true });
  }
}
