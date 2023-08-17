import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm"

@Entity('hobby', { schema: 'voters' })
export class Hobby {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column('character varying')
  name: string

}