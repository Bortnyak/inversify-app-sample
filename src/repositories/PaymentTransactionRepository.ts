import { ICreatePaymentTransaction } from "../interfaces/ICreatePaymentTransaction";
import { IPaymentTransaction } from "../interfaces/IPaymentTransaction";
import { IPaymentTransactionRepository } from "../interfaces/IPaymentTransactionRepository";
import { PaymentTransaction } from "../models/PaymentTransaction";
import { RepositoryDAO } from "./Repository";

export class PaymentTransactionRepository extends RepositoryDAO<IPaymentTransaction> implements IPaymentTransactionRepository {
  
  findAll(): Promise<IPaymentTransaction[]> {
    throw new Error("Method not implemented.");
  }

  async save(paymentTransaction: ICreatePaymentTransaction): Promise<IPaymentTransaction> {
    const repo = await this._getRepository(PaymentTransaction);
    return repo.save(paymentTransaction);
  }
  
}