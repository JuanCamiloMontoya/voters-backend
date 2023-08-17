import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm"

@Entity('occupation', { schema: 'voters' })
export class Occupation {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column('character varying')
  name: string

}