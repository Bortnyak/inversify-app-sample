import { ICreatePayment } from "../interfaces/ICreatePayment";
import { BaseDTO } from "./BaseDTO";

export class PaymentPayload extends BaseDTO implements ICreatePayment {
  amount: number;
  
}