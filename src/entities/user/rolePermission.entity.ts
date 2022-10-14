import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm"
import { EState } from "../@enums/state.enum"
import { Permission } from "./permission.entity"
import { Role } from "./role.entity"

@Entity('role_permission', { schema: 'user' })
export class RolePermission {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column('enum', { enum: EState, default: EState.Active })
  state: EState

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Permission, (permission) => permission.roles)
  @JoinColumn({ name: 'fk_permission' })
  permission: Permission

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'fk_role' })
  role: Role

}