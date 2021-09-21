import "reflect-metadata";

import { IChild } from "../../interfaces/IChild";
import { ICreditCard } from "../../interfaces/ICreditCard";
import { IUser } from "../../interfaces/IUser"
import { IUserChild } from "../../interfaces/IUserChild";

const store: { 
  children: IChild[],
  creditCards: ICreditCard[],
  users: IUser[],
  usersChildren: IUserChild[],
} = {

  children: [],
  creditCards: [],
  users: [],
  usersChildren: [],
  
}

export { store };