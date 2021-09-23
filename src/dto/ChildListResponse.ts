import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { IGetChild } from "../interfaces/IGetChild";
import { BaseDTO } from "./BaseDTO";

@ApiModel({
  name: "ChildListResponse",
  description: "Payload data to update an existing child"
})
export class ChildListResponse extends BaseDTO implements IGetChild {
  @ApiModelProperty({
    description: "Child's id",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.NUMBER,
    example: 1,
    required: true
  })
  id: number;

  @ApiModelProperty({
    description: "Child's name",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    example: "Dan",
    required: true
  })
  name: string;

  @ApiModelProperty({
    description: "Child's age",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    example: 17,
    required: true
  })
  age: number;
}