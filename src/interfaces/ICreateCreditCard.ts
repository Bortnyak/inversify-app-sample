export interface ICreateCreditCard {
  type: string,
  cardNumber: number,
  securityCode: number,
  expMonth: number,
  expYear: number,
  monthLimit: number,
}