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
import { ILoggerService } from "./LoggerService";


@injectable()
export class CreditCardService implements ICreditCardService {
  constructor(
    @inject(TYPES.ILoggerService) private loggerService: ILoggerService,
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

}