export interface IRepository<T> {
  find(id: bigint | string): Promise<T>;
  findAll(): Promise<T[]>;
}