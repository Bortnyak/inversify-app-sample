import { BaseDTO } from  "./BaseDTO";
import { ValidationChain, param, body } from "express-validator";
import { ICreateCreditCard } from "../interfaces/ICreateCreditCard";
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant
} from "swagger-express-ts";
import { IUpdateCreditCard } from "../interfaces/IUpdateCreditCard";

@ApiModel({
  name: "UpdateCreditCardPayload",
  description: "Payload data to create credit card"
})
export class UpdateCreditCardPayload extends BaseDTO implements IUpdateCreditCard {
  @ApiModelProperty({
    description: "A number that represents an month limit. Has to be set at least by 0",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  monthLimit: number;


  static validate(): Array<ValidationChain> {
    return [
      body("monthLimit")
        .isNumeric()
        .toInt()
        .isInt({ min: 0 })
        .withMessage("Month limit couldn't be empty or less than 0")
    ];
  }
}   