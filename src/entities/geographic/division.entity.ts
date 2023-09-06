import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { EDivision } from "../@enums/division.enum";
import { City } from "./city.entity";
import { Subdivision } from "./subdivision.entity";

@Entity("division", { schema: "geographic" })
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("enum", { enum: EDivision })
  type: EDivision;

  @ManyToOne(() => City, (city) => city.divisions, { nullable: false })
  @JoinColumn({ name: "fk_city" })
  city: City;

  @OneToMany(() => Subdivision, (subdivision) => subdivision.division)
  subdivision: Subdivision[];
}
