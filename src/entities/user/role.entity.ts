import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"
import { ERole } from "../@enums/role.enum"
import { RolePermission } from "./rolePermission.entity"
import { UserRole } from "./userRole.entity"

@Entity('role', { schema: 'user' })
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