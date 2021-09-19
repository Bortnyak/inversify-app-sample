import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { IUser } from "../interfaces/IUser";


@Entity({
  name: "users"
})
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn({
    name: "created_at",
    default: new Date(),
  })
  createdAt: Date;

  // TODO: make relations between users --> users_children
  @ManyToOne((type) => User)
  @JoinColumn({
    name: "id",
    referencedColumnName: ""
  })
  children?: IUser[];

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