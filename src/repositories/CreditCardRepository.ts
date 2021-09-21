import { ICreditCard } from "../interfaces/ICreditCard";
import { ICreditCardRepository } from "../interfaces/ICreditCardRepository";
import { RepositoryDAO } from "./Repository";


export class CreditCardRepository extends RepositoryDAO<ICreditCard> implements ICreditCardRepository {
  
  findAll(): Promise<ICreditCard[]> {
    throw new Error("Method not implemented.");
  }


  
}