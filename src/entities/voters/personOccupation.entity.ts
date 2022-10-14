import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Occupation } from "./occupation.entity"
import { Person } from "./person.entity"

@Entity('person_occupation', { schema: 'voters' })
export class PersonOccupation {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @ManyToOne(() => Person, person => person.occupations)
  @JoinColumn({ name: 'fk_person' })
  person: Person

  @ManyToOne(() => Occupation, occupation => occupation.occupations)
  @JoinColumn({ name: 'fk_occupation' })
  occupation: Occupation
}