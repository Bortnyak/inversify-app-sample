import { body, ValidationChain } from "express-validator";
import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { ICreatePayment } from "../interfaces/ICreatePayment";
import { BaseDTO } from "./BaseDTO";


@ApiModel({
  name: "PaymentPayload",
  description: "Payload data to make a payment"
})
export class PaymentPayload extends BaseDTO implements ICreatePayment {
  @ApiModelProperty({
    description: "Amount to withdraw",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    example: 144.4,
    required: true
  })
  amount: number;

  static validate(): Array<ValidationChain> {
    return [
      body("amount")
        .not().isEmpty()
        .trim()
        .isFloat({ min: 1})
        .toFloat()       
    ]
  }
}