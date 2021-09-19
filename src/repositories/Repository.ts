import { Repository, ObjectType } from "typeorm";
import { DatabaseConnection } from "../utils/db/DBConnection";
import { injectable } from "inversify";

/**
 * An interface to be implement by any repository class
 */
export interface IRepository<T> {
  find(id: number | string): Promise<T>;
  findAll(): Promise<T[]>;
}

@injectable()
export abstract class RepositoryDAO<T> {
  protected async _getRepository(
    entity: ObjectType<T>
  ): Promise<Repository<T>> {
    const connection = await DatabaseConnection.getDBConnection();
    return connection.getRepository(entity);
  }
}
