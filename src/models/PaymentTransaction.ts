import { ICreditCard } from "../interfaces/ICreditCard";
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { CreditCard } from "./CreditCard";
import { IPaymentTransaction, TransactionStatus } from "../interfaces/IPaymentTransaction";


@Entity({ name: "payment_transactions" })
export class PaymentTransaction implements IPaymentTransaction {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => CreditCard)
  @JoinColumn({ name: "card_id" })
  card: ICreditCard;

  @Column()
  amount: number;

  @Column()
  status: TransactionStatus;

  @CreateDateColumn({
    name: "created_at",
    default: new Date(),
    select: false,
  })
  createdAt: Date;

}