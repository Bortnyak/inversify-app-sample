import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { ICreditCard } from "../interfaces/ICreditCard";


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

  @Column({ name: "exp_date" })
  exp: Date;

  @Column({ name: "month_limit" })
  monthLimit: number;

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