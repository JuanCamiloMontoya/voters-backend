import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AbstractEntity } from "../@common/abstract.entity";
import { EState } from "../@enums/state.enum";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity("user_role", { schema: "users" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("enum", { enum: EState, default: EState.Active })
  state: EState;

  @ManyToOne(() => User, (user) => user.roles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "fk_user" })
  user: User;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "fk_role" })
  role: Role;
}
