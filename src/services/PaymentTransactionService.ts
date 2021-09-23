import { injectable, inject } from "inversify";
import { ILoggerService } from "../infrastructure/Logger/LoggerService";

import { ICreatePaymentTransaction } from "../interfaces/ICreatePaymentTransaction";
import { IPaymentTransaction } from "../interfaces/IPaymentTransaction";
import { IPaymentTransactionRepository } from "../interfaces/IPaymentTransactionRepository";
import { IPaymentTransactionService } from "../interfaces/IPaymentTransactionService";
import TYPES from "../utils/di/identifiers";

@injectable()
export class PaymentTransactionService implements IPaymentTransactionService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IPaymentTransactionRepository) private paymentTransactionsRepo: IPaymentTransactionRepository,
  ) { this.loggerService.setContext(this) }
 
 
  async commit(paymentTransaction: ICreatePaymentTransaction): Promise<IPaymentTransaction> {
    return await this.paymentTransactionsRepo.save(paymentTransaction);
  }

}