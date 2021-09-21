import { BaseDTO } from  "./BaseDTO";
import { ValidationChain, param, body } from "express-validator";
import { ICreateCreditCard } from "../interfaces/ICreateCreditCard";
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant
} from "swagger-express-ts";

@ApiModel({
  name: "CreateCreditCardPayload",
  description: "Payload data to create credit card"
})
export class CreateCreditCardPayload extends BaseDTO implements ICreateCreditCard {
  @ApiModelProperty({
    description: "A type of card, could be 'vias' or 'mastercard'",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  type: string;

  @ApiModelProperty({
    description: "Card number is a string representation of 16 digits",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  cardNumber: number;

  @ApiModelProperty({
    description: "Security code is a string representation of 3 digits",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  securityCode: number;

  @ApiModelProperty({
    description: "expMonth is a number representation of month between 0 and 11",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  expMonth: number;

  @ApiModelProperty({
    description: "expYear is a number representation of year",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  expYear: number;

  @ApiModelProperty({
    description: "A number that represents an month limit. Has to be set at least by 0",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  monthLimit: number;


  static validate(): Array<ValidationChain> {
    return [
      body("type")
        .isString()
        .trim()
        .notEmpty()
        .toLowerCase()
        .isIn(["visa", "mastercard"]).withMessage("The type of card has to be 'visa' or 'mastercard'"),
      body("cardNumber")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ min: 16, max: 16 })
        .toInt()
        .withMessage("Card number is a string representation of 16 digits"),
      body("securityCode")
        .isString()
        .trim()
        .notEmpty()
        .isLength({ min: 3, max: 3 })
        .toInt()
        .withMessage("Security code is a string representation of 3 digits"),
      body("expMonth")
        .isNumeric()
        .notEmpty()
        .toInt()
        .isInt({ min: new Date().getMonth(), max: 11 })
        .withMessage("expMonth is a number representation of month between 0 and 11"),
      body("expYear")
        .isNumeric()
        .notEmpty()
        .toInt()
        .isInt({ min: 2021 }) // the correct expired date cannot be less than the current year
        .withMessage("expYear is a number representation of year"),
      body("monthLimit")
        .isNumeric()
        .toInt()
        .withMessage("Month limit couldn't be empty")
    ];
  }
}   