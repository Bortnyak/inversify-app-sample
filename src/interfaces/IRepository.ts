export interface IRepository<T> {
  find(id: number | string): Promise<T>;
  findAll(): Promise<T[]>;
}