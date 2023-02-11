import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm"
/* import { PersonHobby } from "./person-hobby.entity" */

@Entity('hobby', { schema: 'voters' })
export class Hobby {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column('character varying')
  name: string

/*   @OneToMany(() => PersonHobby, personHobby => personHobby.hobby)
  people: PersonHobby[] */

}