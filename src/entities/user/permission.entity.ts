import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"
import { RolePermission } from "./rolePermission.entity"

@Entity('permission', { schema: 'user' })
export class Permission {

  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number

  @Column('character varying')
  key: string

  @Column('character varying')
  name: string

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
  roles: RolePermission[]
}