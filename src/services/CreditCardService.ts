import { injectable, inject } from "inversify";

import { ICreditCardService } from "../interfaces/ICreditCardService";
import TYPES from "../utils/di/identifiers";
import { ILoggerService } from "./LoggerService";


@injectable()
export class CreditCardService implements ICreditCardService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
  ) { this.loggerService.setContext(this) }



}