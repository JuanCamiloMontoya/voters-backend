import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"
import { ERole } from "../@enums/role.enum"
import { RolePermission } from "./role-permission.entity"
import { UserRole } from "./user-role.entity"

@Entity('role', { schema: 'users' })
export class Role {

  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number

  @Column('enum', { enum: ERole, default: ERole.Admin })
  key: ERole

  @Column('character varying')
  name: string

  @OneToMany(() => UserRole, userRole => userRole.role)
  users: UserRole[]

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  permissions: RolePermission[]

}