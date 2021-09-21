import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ICreditCard } from "../interfaces/ICreditCard";
import { IUser } from "../interfaces/IUser";
import { IUserChild } from "../interfaces/IUserChild";
import { CreditCard } from "./CreditCard";
import { UserChild } from "./UserChild";


@Entity({ name: "users" })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

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

  @OneToMany(() => UserChild, (userCh) => userCh.user, { eager: true })
  children: IUserChild[];


  @OneToMany(() => CreditCard, (card) => card.owner, { eager: true })
  creditCards: ICreditCard[];

}