import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn } from "typeorm";

import { IChild } from "../interfaces/IChild";

@Entity({ name: "children" })
export class Child implements IChild {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn({
    name: "created_at",
    default: new Date(),
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    default: new Date(),
    select: false,
  })
  updatedAt?: Date;

}