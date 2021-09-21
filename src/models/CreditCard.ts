import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ICreditCard } from "../interfaces/ICreditCard";
import { IUser } from "../interfaces/IUser";
import { User } from "./User";


@Entity({ name: "credit_cards" })
export class CreditCard implements ICreditCard {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ name: "card_number"})
  cardNumber: number;

  @Column({ name: "security_code"})
  securityCode: number;

  @Column({ name: "exp_date_year" })
  expYear: number;

  @Column({ name: "exp_date_month" })
  expMonth: number;

  @Column({ name: "month_limit" })
  monthLimit: number;


  @ManyToOne((type) => User)
  @JoinColumn({ name: "owner_id" })
  owner: IUser;

  

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