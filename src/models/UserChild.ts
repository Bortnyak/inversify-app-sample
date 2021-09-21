import { PrimaryColumn, Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

import { IChild } from "../interfaces/IChild";
import { IUser } from "../interfaces/IUser";
import { IUserChild } from "../interfaces/IUserChild";
import { Child } from "./Child";
import { User } from "./User";


@Entity({ name: "users_children" })
export class UserChild implements IUserChild {
  @PrimaryColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.children)
  @JoinColumn({ name: "user_id" })
  user: IUser;

  @ManyToOne((type) => Child)
  @JoinColumn({ name: "child_id" })
  child: IChild;

  @CreateDateColumn({
    name: "created_at",
    default: new Date(),
    select: false,
  })
  createdAt: Date;
}
