import { ICreateUser } from "../../../interfaces/ICreateUser";
import { IUser } from "../../../interfaces/IUser";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { store as mockDB } from "../store";

export class UserRepositoryMock implements IUserRepository {
  find(id: number): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<IUser> {
    return mockDB.users.find(user => user.id == id);
  }
  
  async findByEmail(email: string): Promise<IUser> {
    return mockDB.users.find(user => user.email == email);
  }


  create(userPayload: ICreateUser): Promise<IUser> {
    const usersLength = mockDB.users.length;
    const userToCreate: IUser = {
      id: usersLength + 1,
      createdAt: new Date(),
      updatedAt: null,
      children: [],
      creditCards: [],
      ...userPayload,
    };
   mockDB.users.push(userToCreate);
   return Promise.resolve(userToCreate);
  }


  async findByEmailWithPassword(email: string): Promise<IUser> {
    return mockDB.users.find(user => user.email == email);
  }
  

  findAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }

}