import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Department } from "./department.entity";
import { Division } from "./division.entity";
import { Subdivision } from "./subdivision.entity";

@Entity("city", { schema: "geographic" })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.cities, {
    nullable: false,
  })
  @JoinColumn({ name: "fk_department" })
  department: Department;

  @OneToMany(() => Division, (division) => division.city)
  divisions: Subdivision[];
}
