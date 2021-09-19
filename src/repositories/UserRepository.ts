import { ICreateUser } from "../interfaces/ICreateUser";
import { IUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/User";
import { CatchError } from "../utils/CatchWrapper";
import { RepositoryDAO } from "./Repository";


export class UserRepository extends RepositoryDAO<IUser> implements IUserRepository {
  @CatchError("Failed to create new user")
  async create(userPayload: ICreateUser): Promise<IUser> {
    const repo = await this._getRepository(User);
    return repo.save(userPayload);
  }

  find(id: number): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  @CatchError("Failed to find user by email")
  async findByEmail(email: string): Promise<IUser> {
    const repo = await this._getRepository(User);
    return repo.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne()
  }

  findAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }

  @CatchError("Failed to find user by id")
  async findById(id: bigint): Promise<IUser> {
    const repo = await this._getRepository(User);
    return repo.createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne()
  }

  

}