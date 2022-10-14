import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from "typeorm"
import { EState } from "../@enums/state.enum"
import { Person } from "../voters/person.entity"
import { UserRole } from "./userRole.entity"
import { Exclude } from "class-transformer"

@Entity('user', { schema: 'user' })
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column('character varying', { length: 200, nullable: true, unique: true })
  email: string

  @Column('character varying', { length: 250, nullable: true })
  @Exclude()
  password: string

  @Column('character varying', { length: 250, nullable: true, name: 'password_reset_code' })
  @Exclude()
  passwordResetCode: string

  @Column('timestamp', { nullable: true, name: 'password_reset_expiration' })
  @Exclude()
  passwordResetExpiration: Date

  @Column('enum', { enum: EState, default: EState.Active })
  state: EState

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

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