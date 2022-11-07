import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm"
import { EState } from "../@enums/state.enum"
import { Permission } from "./permission.entity"
import { Role } from "./role.entity"

@Entity('role_permission', { schema: 'users' })
export class RolePermission {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column('enum', { enum: EState, default: EState.Active })
  state: EState

  @ManyToOne(() => Permission, (permission) => permission.roles)
  @JoinColumn({ name: 'fk_permission' })
  permission: Permission

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'fk_role' })
  role: Role

}