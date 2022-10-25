import { ApiProperty } from "@nestjs/swagger"
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm"
import { AbstractEntity } from "../@common/abstract.entity"
import { Subdivision } from "../geographic/subdivision.entity"
import { User } from "../user/user.entity"
import { Occupation } from "./occupation.entity"
import { PersonOccupation } from "./person-occupation.entity"

@Entity('person', { schema: 'voters' })
@Unique(['document'])
export class Person extends AbstractEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ApiProperty()
  @Column('character varying', { length: 50 })
  firstname: string

  @ApiProperty()
  @Column('character varying', { length: 50 })
  lastname: string

  @ApiProperty()
  @Column('character varying')
  document: string

  @ApiProperty()
  @Column('character varying', { length: 30, nullable: true })
  phone: string

  @ApiProperty()
  @Column('character varying', { length: 200, nullable: true })
  email: string

  @OneToOne(() => User, user => user.person)
  @ApiProperty()
  user: User

  @OneToMany(() => PersonOccupation, personOccupation => personOccupation.person)
  occupations: Occupation[]

  @ManyToOne(() => Subdivision, subdivision => subdivision.people, { nullable: true })
  @JoinColumn({ name: 'fk_subdivision' })
  subdivision: Subdivision
}