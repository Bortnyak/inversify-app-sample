import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import { IChild } from "../interfaces/IChild";
import { ICreditCard } from "../interfaces/ICreditCard";
import { CreditCard } from "./CreditCard";

@Entity({ name: "children" })
export class Child implements IChild {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToOne(() => CreditCard)
  @JoinColumn({ name: "card_id" })
  creditCard?: ICreditCard;

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