import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
import { ILogin } from "../interfaces/ILogin";
import { BaseDTO } from "./BaseDTO";


@ApiModel({
  name: "LoginPayload",
  description: "Payload data to login"
})
export class LoginPayload extends BaseDTO implements ILogin {
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