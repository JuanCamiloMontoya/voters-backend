import { ApiProperty } from "@nestjs/swagger"
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from "typeorm"
import { AbstractEntity } from "../@common/abstract.entity"
import { Subdivision } from "../geographic/subdivision.entity"
import { User } from "../users/user.entity"
import { Hobby } from "./hobby.entity"
import { Occupation } from "./occupation.entity"

@Entity('person', { schema: 'voters' })
@Unique(['document'])
export class Person extends AbstractEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ApiProperty()
  @Column('character varying', { length: 30 })
  firstname: string

  @ApiProperty()
  @Column('character varying', { length: 30 })
  lastname: string

  @ApiProperty()
  @Column('character varying', { length: 10 })
  document: string

  @ApiProperty()
  @Column('character varying', { length: 10, nullable: true })
  phone: string

  @ApiProperty()
  @Column('character varying', { length: 30, nullable: true })
  email: string

  @ApiProperty()
  @Column('date', { nullable: true })
  birthdate: Date

  @OneToOne(() => User, user => user.person)
  @ApiProperty()
  user: User

  @ManyToMany(() => Occupation)
  @JoinTable({
    name: 'person_occupation',
    joinColumn: { name: 'fk_person' },
    inverseJoinColumn: { name: 'fk_occupation' }
  })
  occupations: Occupation[]

  @ManyToMany(() => Hobby)
  @JoinTable({
    name: 'person_hobby',
    joinColumn: { name: 'fk_person' },
    inverseJoinColumn: { name: 'fk_hobby' }
  })
  hobbies: Hobby[]

  @ManyToOne(() => Subdivision, subdivision => subdivision.people, { nullable: true })
  @JoinColumn({ name: 'fk_subdivision' })
  subdivision: Subdivision
}