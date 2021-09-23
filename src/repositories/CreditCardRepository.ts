import { DeleteResult, UpdateResult } from "typeorm";
import { ICreateCreditCard } from "../interfaces/ICreateCreditCard";
import { ICreditCard } from "../interfaces/ICreditCard";
import { ICreditCardRepository } from "../interfaces/ICreditCardRepository";
import { ICreditCardToSave } from "../interfaces/ICreditCardToSave";
import { CreditCard } from "../models/CreditCard";
import { CatchError } from "../utils/CatchWrapper";
import { RepositoryDAO } from "./Repository";


export class CreditCardRepository extends RepositoryDAO<ICreditCard> implements ICreditCardRepository {
  
  @CatchError("Failed to create card by name")
  async createCreditCard(card: ICreditCardToSave): Promise<ICreditCard> {
    const repo = await this._getRepository(CreditCard);
    return repo.save(card);
  }


  @CatchError("Failed to find card by id and user")
  async findByIdAndOwner(cardId: number, owner: number): Promise<ICreditCard> {
    const repo = await this._getRepository(CreditCard);
    return repo.createQueryBuilder("creditCard")
      .where("creditCard.id = :cardId", { cardId })
      .andWhere("creditCard.owner = :owner", { owner })
      .getOne()
  }
  

  findAll(): Promise<ICreditCard[]> {
    throw new Error("Method not implemented.");
  }


  @CatchError("Failed to update month limit")
  async updateMonthLimit(cardId: number, monthLimit: number): Promise<UpdateResult> {
    const repo = await this._getRepository(CreditCard);
    return repo.createQueryBuilder()
      .update(CreditCard)
      .set({ monthLimit })
      .where("id = :cardId", { cardId })
      .execute();
  }
  

  @CatchError("Failed to delete card")
  async deleteCreditCard(cardId: number): Promise<DeleteResult> {
    const repo = await this._getRepository(CreditCard);
    return repo.createQueryBuilder("child")
      .delete()
      .from(CreditCard)
      .where("id = :cardId", { cardId })
      .execute();
  }

  
}