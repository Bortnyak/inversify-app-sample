import { injectable, inject } from "inversify";
import { ICreateCreditCard } from "../interfaces/ICreateCreditCard";
import { ICreditCard } from "../interfaces/ICreditCard";
import { ICreditCardRepository } from "../interfaces/ICreditCardRepository";
import { ICreditCardService } from "../interfaces/ICreditCardService";
import { ICreditCardToSave } from "../interfaces/ICreditCardToSave";
import { IUpdateCreditCard } from "../interfaces/IUpdateCreditCard";
import { IUser } from "../interfaces/IUser";
import TYPES from "../utils/di/identifiers";
import { HttpException } from "../utils/HTTPExceptionHelper";
import { ILoggerService } from "../infrastructure/Logger/LoggerService";
import { IPaymentTransactionService } from "../interfaces/IPaymentTransactionService";
import { ICreatePaymentTransaction } from "../interfaces/ICreatePaymentTransaction";
import { TransactionStatus } from "../interfaces/IPaymentTransaction";


@injectable()
export class CreditCardService implements ICreditCardService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(TYPES.IPaymentTransactionService) private paymentTransactionService: IPaymentTransactionService,
    @inject(TYPES.ICreditCardRepository) private creditCardRepo: ICreditCardRepository,
  ) { this.loggerService.setContext(this) }


  async addCard(user: IUser, cardPayload: ICreateCreditCard): Promise<void> {
    const cardToSave: ICreditCardToSave = {
      owner: user, ...cardPayload, 
    };
    await this.creditCardRepo.createCreditCard(cardToSave);
    return;
  }

  async deleteCard(cardId: number, user: IUser): Promise<void> {
    const card = await this.creditCardRepo.findByIdAndOwner(cardId, user.id);
    if (!card) {
      const errorMessage = "Card not found";
      this.loggerService.logError(errorMessage);
      throw new HttpException(404, errorMessage);
    }

    await this.creditCardRepo.deleteCreditCard(cardId);
    return;
  }

  
  async updateMonthLimit(cardId: number, user: IUser, updateCardPayload: IUpdateCreditCard): Promise<void> {
    const card = await this.creditCardRepo.findByIdAndOwner(cardId, user.id);
    if (!card) {
      const errorMessage = "Card not found";
      this.loggerService.logError(errorMessage);
      throw new HttpException(403, errorMessage);
    }
    await this.creditCardRepo.updateMonthLimit(cardId, updateCardPayload.monthLimit);
    return;
  }


  async findByIdAndOwner(id: number, ownerId: number): Promise<ICreditCard> {
    return await this.creditCardRepo.findByIdAndOwner(id, ownerId);
  }


  async makePayment(id: number, ownerId: number, amount: number): Promise<void> {
    const card: ICreditCard = await this.creditCardRepo.findByIdAndOwner(id, ownerId);
    if (!card) {
      const errorMessage = "Card not found";
      this.loggerService.logError(errorMessage);
      throw new HttpException(404, errorMessage);
    }

    const transactionStatus: TransactionStatus = await this.withdraw(card, amount);
    const transactionInfo: ICreatePaymentTransaction = {
      card,
      amount,
      status: transactionStatus,
    };

    await this.paymentTransactionService.commit(transactionInfo);
    if (transactionStatus === TransactionStatus.failure) {
      const errorMessage = "Month limit exceeded";
      this.loggerService.logError(errorMessage);
      throw new HttpException(402, errorMessage);
    }

    return;
  }


  private async withdraw(card: ICreditCard, amount: number): Promise<TransactionStatus> {
    const cardMonthLimit = Number(card.monthLimit);

    if (amount > cardMonthLimit) {
      return TransactionStatus.failure; 
    }

    const newMonthLimit = cardMonthLimit - amount;
    await this.creditCardRepo.updateMonthLimit(card.id, newMonthLimit);
    return TransactionStatus.success;
  }
}