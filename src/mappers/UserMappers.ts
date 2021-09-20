import { IGetUserMapper } from "../interfaces/IGetUserMapper";
import { IUser } from "../interfaces/IUser";

export const dumpUser = (user: IUser): IGetUserMapper => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}
