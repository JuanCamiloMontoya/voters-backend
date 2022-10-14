import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"
import { PersonOccupation } from "./personOccupation.entity"

@Entity('occupation', { schema: 'voters' })
export class Occupation {

  @PrimaryGeneratedColumn({ type: 'smallint' })
  id: number

  @Column('character varying')
  name: string

  @OneToMany(() => PersonOccupation, personOccupation => personOccupation.occupation)
  occupations: PersonOccupation[]

}