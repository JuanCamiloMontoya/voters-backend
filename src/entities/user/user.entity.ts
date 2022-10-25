import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm"
import { EState } from "../@enums/state.enum"
import { Person } from "../voters/person.entity"
import { UserRole } from "./user-role.entity"
import { Exclude } from "class-transformer"
import { ApiProperty } from '@nestjs/swagger'
import { AbstractEntity } from "../@common/abstract.entity"

@Entity('user', { schema: 'user' })
export class User extends AbstractEntity {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column('character varying', { length: 200, nullable: true, unique: true })
  @ApiProperty()
  email: string

  @Column('character varying', { length: 250, nullable: true })
  @ApiProperty()
  @Exclude()
  password: string

  @Column('character varying', { length: 250, nullable: true, name: 'password_reset_code' })
  @Exclude()
  passwordResetCode: string

  @Column('timestamp', { nullable: true, name: 'password_reset_expiration' })
  @Exclude()
  passwordResetExpiration: Date

  @Column('enum', { enum: EState, default: EState.Active })
  @ApiProperty()
  state: EState

  @OneToOne(
    type => Person,
    person => person.user,
    { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn({ name: 'fk_person' })
  person: Person

  @OneToMany(() => UserRole, userRole => userRole.user)
  roles: UserRole[]

}