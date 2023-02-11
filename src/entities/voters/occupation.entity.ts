import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"
/* import { PersonOccupation } from "./person-occupation.entity" */

@Entity('occupation', { schema: 'voters' })
export class Occupation {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column('character varying')
  name: string

  /* @OneToMany(() => PersonOccupation, personOccupation => personOccupation.occupation)
  occupations: PersonOccupation[] */

}