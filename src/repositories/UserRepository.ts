import { IUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/User";
import { CatchError } from "../utils/CatchWrapper";
import { RepositoryDAO } from "./Repository";


export class UserRepository extends RepositoryDAO<IUser> implements IUserRepository {
  @CatchError("Failed to find user by id")
  async find(id: bigint): Promise<IUser> {
    const repo = await this._getRepository(User);
    return repo.findOne(id);
  }

  findAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }

}