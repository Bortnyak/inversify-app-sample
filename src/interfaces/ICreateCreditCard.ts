export interface ICreateCreditCard {
  type: string,
  cardNumber: number, 
  securityCode: number,
  exp: Date,
  monthLimit: number,
}