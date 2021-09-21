import { ValidationChain } from "express-validator";

export abstract class BaseDTO {
  static validate(): Array<ValidationChain> {
    return;
  }
} 