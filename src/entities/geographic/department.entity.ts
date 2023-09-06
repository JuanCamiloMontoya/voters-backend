import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { City } from "./city.entity";

@Entity("department", { schema: "geographic" })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.department)
  cities: City[];
}
