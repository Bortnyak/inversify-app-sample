import { DeleteResult, UpdateResult } from "typeorm";
import { ICreateCreditCard } from "../interfaces/ICreateCreditCard";
import { ICreditCard } from "../interfaces/ICreditCard";
import { ICreditCardRepository } from "../interfaces/ICreditCardRepository";
import { ICreditCardToSave } from "../interfaces/ICreditCardToSave";
import { CreditCard } from "../models/CreditCard";
import { RepositoryDAO } from "./Repository";


export class CreditCardRepository extends RepositoryDAO<ICreditCard> implements ICreditCardRepository {
  
  async createCreditCard(card: ICreditCardToSave): Promise<ICreditCard> {
    const repo = await this._getRepository(CreditCard);
    return repo.save(card);
  }


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


  async updateMonthLimit(cardId: number, monthLimit: number): Promise<UpdateResult> {
    const repo = await this._getRepository(CreditCard);
    return repo.createQueryBuilder()
      .update(CreditCard)
      .set({ monthLimit })
      .where("id = :cardId", { cardId })
      .execute();
  }
  
  
  async deleteCreditCard(cardId: number): Promise<DeleteResult> {
    const repo = await this._getRepository(CreditCard);
    return repo.createQueryBuilder("child")
      .delete()
      .from(CreditCard)
      .where("id = :cardId", { cardId })
      .execute();
  }


  // async charge(cardId: number, amount: number): Promise<UpdateResult> {

  // }
}