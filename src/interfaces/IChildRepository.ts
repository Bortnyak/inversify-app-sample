import { UpdateResult } from "typeorm";
import { IRepository } from "../repositories/Repository";
import { IChild } from "./IChild";
import { ICreateChild } from "./ICreateChild";
import { IUpdateChild } from "./IUpdateChild";


export interface IChildRepository extends IRepository<IChildRepository> {
  findById(id: number): Promise<IChild>;
  create(childPayload: ICreateChild): Promise<IChild>;
  findByName(name: string): Promise<IChild>;
  update(id: number, childPayload: IUpdateChild): Promise<UpdateResult>;
}