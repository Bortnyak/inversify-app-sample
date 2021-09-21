import { ICreateChild } from "../interfaces/ICreateChild";
import { BaseDTO } from "./BaseDTO";
import {
  ApiModel,
  ApiModelProperty,
  SwaggerDefinitionConstant
} from "swagger-express-ts";
import { body, ValidationChain } from "express-validator";


@ApiModel({
  name: "CreateChildPayload",
  description: "Payload data to create a child"
})
export class CreateChildPayload extends BaseDTO implements ICreateChild {
  @ApiModelProperty({
    description: "Child's name",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: true
  })
  name: string;

  @ApiModelProperty({
    description: "Child's age",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    required: false
  })
  age?: number;

  static validate(): Array<ValidationChain> {
    return [
      body("name")
        .isString()
        .trim()
        .notEmpty(),
      body("age")
        .optional()
        .isString()
        .trim()
        .notEmpty()
    ]
  }
  
}