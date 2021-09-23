import { DeleteResult, UpdateResult } from "typeorm";
import { IChild } from "../interfaces/IChild";
import { IChildRepository } from "../interfaces/IChildRepository";
import { ICreateChild } from "../interfaces/ICreateChild";
import { ICreditCard } from "../interfaces/ICreditCard";
import { IUpdateChild } from "../interfaces/IUpdateChild";
import { Child } from "../models/Child";
import { CatchError } from "../utils/CatchWrapper";
import { RepositoryDAO } from "./Repository";


export class ChildRepository extends RepositoryDAO<IChild> implements IChildRepository {
  
  @CatchError("Failed to find child by name")
  async findByName(name: string): Promise<IChild> {
    const repo = await this._getRepository(Child);
    return repo.createQueryBuilder("child")
      .where("child.name = :name", { name })
      .getOne();
  }

  @CatchError("Failed to find child by id")
  findById(id: number): Promise<IChild> {
    throw new Error("Method not implemented.");
  }

  @CatchError("Failed to create child")
  async create(childPayload: ICreateChild): Promise<IChild> {
    const repo = await this._getRepository(Child);
    return repo.save(childPayload);
  }


  findAll(): Promise<IChildRepository[]> {
    throw new Error("Method not implemented.");
  }

  @CatchError("Failed to update child by id")
  async update(id: number, childPayload: IUpdateChild): Promise<UpdateResult> {
    const repo = await this._getRepository(Child);
    return repo.createQueryBuilder("child")
      .update(Child)
      .set(childPayload)
      .where("id = :id", { id })
      .execute();
  }
  
  @CatchError("Failed to delete child")
  async delete(id: number): Promise<DeleteResult> {
    const repo = await this._getRepository(Child);
    return repo.createQueryBuilder()
    .delete()
    .from(Child)
    .where("id = :id", { id })
    .execute();
  }

  @CatchError("Failed to update childs card")
  async updateCard(childId: number, card: ICreditCard): Promise<UpdateResult> {
    const repo = await this._getRepository(Child);
    return repo.createQueryBuilder()
      .update(Child)
      .set({ creditCard: card })
      .where("id = :childId", { childId })
      .execute();
  }

  
}