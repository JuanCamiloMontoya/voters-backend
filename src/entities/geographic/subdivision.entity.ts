import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { ESubdivision } from "../@enums/division.enum"
import { Person } from "../voters/person.entity"
import { Division } from "./division.entity"

@Entity('subdivision', { schema: 'geographic' })
export class Subdivision {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('enum', { enum: ESubdivision, default: ESubdivision.RuralSettlement })
  type: ESubdivision

  @ManyToOne(() => Division, division => division.subdvision, { nullable: false })
  @JoinColumn({ name: 'fk_division' })
  division: Division

  @OneToMany(() => Person, person => person.subdivision)
  people: Person[]
}