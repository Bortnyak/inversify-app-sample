import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { ICreateUser } from "../interfaces/ICreateUser";
import { BaseDTO } from "./BaseDTO";


@ApiModel({
  name: "RegisterPayload",
  description: "Payload data to register new user"
})
export class RegisterPayload extends BaseDTO implements ICreateUser {
  @ApiModelProperty({
    description: "Name",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    example: "Vova",
    required: true
  })
  name: string;
  
  @ApiModelProperty({
    description: "Email",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    example: "vova@vova.com",
    required: true
  })
  email: string;

  @ApiModelProperty({
    description: "Password",
    itemType: SwaggerDefinitionConstant.Model.Property.Type.STRING,
    example: "123",
    required: true
  })
  password: string;

}