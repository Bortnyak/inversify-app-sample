import { IGetChild } from "../interfaces/IGetChild";
import { IUserChild } from "../interfaces/IUserChild";

export const dumpUsersChildren = (userChild: IUserChild): IGetChild => {
  return {
    id: userChild.child.id,
    name: userChild.child.name,
    age: userChild.child.age,
  }
}
