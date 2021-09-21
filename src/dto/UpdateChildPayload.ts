import { BaseDTO } from  "./BaseDTO";
import { ValidationChain, param, body } from "express-validator";
import { ICreateCreditCard } from "../interfaces/ICreateCreditCard";
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant
} from "swagger-express-ts";
import { IUpdateCreditCard } from "../interfaces/IUpdateCreditCard";
import { IUpdateChild } from "../interfaces/IUpdateChild";

@ApiModel({
  name: "UpdateChildPayload",
  description: "Payload data to update an existing child"
})
export class UpdateChildPayload extends BaseDTO implements IUpdateChild {
  @ApiModelProperty({
    description: "Name field to update",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  name?: string;

  @ApiModelProperty({
    description: "Name field to update",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  age?: number;

  static validate(): Array<ValidationChain> {
    return [
      body("name")
        .isString()
        .trim(),
      body("age")
        .isNumeric()
        .toInt()
        .isInt({ min: 1 })
    ];
  }
}   