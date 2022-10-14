import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm"
import { Subdivision } from "../geographic/subdivision.entity"
import { User } from "../user/user.entity"
import { Occupation } from "./occupation.entity"
import { PersonOccupation } from "./personOccupation.entity"

@Entity('person', { schema: 'voters' })
@Unique(['document'])
export class Person {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column('character varying', { length: 50 })
  firstname: string

  @Column('character varying', { length: 50 })
  lastname: string

  @Column('character varying')
  document: string

  @Column('character varying', { length: 30, nullable: true })
  phone: string

  @Column('character varying', { length: 200, nullable: true })
  email: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date

  @OneToOne(() => User, user => user.person)
  user: User

  @OneToMany(() => PersonOccupation, personOccupation => personOccupation.person)
  occupations: Occupation[]

  @ManyToOne(() => Subdivision, subdivision => subdivision.people, { nullable: true })
  @JoinColumn({ name: 'fk_subdivision' })
  subdivision: Subdivision
}