import { IRepository } from "../repositories/Repository";
import { IChild } from "./IChild";
import { ICreateChild } from "./ICreateChild";


export interface IChildRepository extends IRepository<IChildRepository> {
  findById(id: bigint): Promise<IChild>;
  create(childPayload: ICreateChild): Promise<IChild>;
  findByName(name: string): Promise<IChild>;
}