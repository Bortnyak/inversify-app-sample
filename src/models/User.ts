import { PrimaryColumn, Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { IRole } from "../interfaces/IRole";
import { IUser } from "../interfaces/IUser";
import { Role } from "../models/Role"; 


@Entity({
  name: "users"
})
export class User implements IUser {
  @PrimaryColumn()
  id: bigint;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @ManyToOne((type) => Role)
  @JoinColumn({
    name: "id"
  })
  role: IRole;

  @CreateDateColumn({
    name: "created_at",
    default: new Date(),
  })
  createdAt: Date;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: "id",
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