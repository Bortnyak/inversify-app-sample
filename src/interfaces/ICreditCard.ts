export interface ICreditCard {
  id: bigint,
  type: string,
  cardNumber: number, 
  securityCode: number,
  exp: Date,
  monthLimit: number,
  createdAt: Date,
  updatedAt?: Date,
  deletedAt?: Date,
}