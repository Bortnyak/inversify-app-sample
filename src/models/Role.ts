import { Column, PrimaryColumn } from "typeorm";
import { IRole } from "../interfaces/IRole";

export class Role implements IRole {
  @PrimaryColumn()
  id: bigint;

  @Column()
  name: string;
}