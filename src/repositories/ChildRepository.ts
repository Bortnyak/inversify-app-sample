import { DeleteResult, UpdateResult } from "typeorm";
import { IChild } from "../interfaces/IChild";
import { IChildRepository } from "../interfaces/IChildRepository";
import { ICreateChild } from "../interfaces/ICreateChild";
import { IUpdateChild } from "../interfaces/IUpdateChild";
import { Child } from "../models/Child";
import { RepositoryDAO } from "./Repository";


export class ChildRepository extends RepositoryDAO<IChild> implements IChildRepository {
 
  async findByName(name: string): Promise<IChild> {
    const repo = await this._getRepository(Child);
    return repo.createQueryBuilder("child")
      .where("child.name = :name", { name })
      .getOne();
  }


  findById(id: number): Promise<IChild> {
    throw new Error("Method not implemented.");
  }


  async create(childPayload: ICreateChild): Promise<IChild> {
    const repo = await this._getRepository(Child);
    return repo.save(childPayload);
  }


  findAll(): Promise<IChildRepository[]> {
    throw new Error("Method not implemented.");
  }


  async update(id: number, childPayload: IUpdateChild): Promise<UpdateResult> {
    const repo = await this._getRepository(Child);
    return repo.createQueryBuilder("child")
      .update(Child)
      .set(childPayload)
      .where("id = :id", { id })
      .execute();
  }
  

  async delete(id: number): Promise<DeleteResult> {
    const repo = await this._getRepository(Child);
    return repo.createQueryBuilder()
    .delete()
    .from(Child)
    .where("id = :id", { id })
    .execute();
  }
}