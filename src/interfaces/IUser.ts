
export interface IUser {
  id: bigint,
  name: string, 
  email: string,
  createdAt: Date,
  children?: IUser[],
  updatedAt?: Date,
}