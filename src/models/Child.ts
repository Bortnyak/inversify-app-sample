import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

import { IChild } from "../interfaces/IChild";

export class Child implements IChild {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn({
    name: "created_at",
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    default: new Date(),
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    default: new Date(),
  })
  deletedAt?: Date;
}