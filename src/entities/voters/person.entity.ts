import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { AbstractEntity } from "../@common/abstract.entity";
import { Subdivision } from "../geographic/subdivision.entity";
import { User } from "../users/user.entity";
import { Hobby } from "./hobby.entity";
import { Occupation } from "./occupation.entity";
import { EState } from "../@enums/state.enum";
import { EGender } from "../@enums/gender.enum";

@Entity("person", { schema: "voters" })
@Unique(["document", "state"])
export class Person extends AbstractEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @ApiProperty()
  @Column("character varying", { length: 30 })
  firstname: string;

  @ApiProperty()
  @Column("character varying", { length: 30 })
  lastname: string;

  @ApiProperty()
  @Column("character varying", { length: 10 })
  document: string;

  @ApiProperty()
  @Column("character varying", { length: 10, nullable: true })
  phone: string;

  @ApiProperty()
  @Column("character varying", { length: 30, nullable: true })
  email: string;

  @ApiProperty()
  @Column("date", { nullable: true })
  birthdate: Date;

  @ApiProperty()
  @Column("enum", { enum: EGender, nullable: true })
  gender: EGender;

  @ApiProperty()
  @Column("enum", { enum: EState, default: EState.Active })
  state: EState;

  @ApiProperty()
  @OneToOne(() => User, (user) => user.person)
  user: User;

  @ManyToMany(() => Occupation)
  @JoinTable({
    name: "person_occupation",
    joinColumn: { name: "fk_person" },
    inverseJoinColumn: { name: "fk_occupation" },
  })
  occupations: Occupation[];

  @ManyToMany(() => Hobby)
  @JoinTable({
    name: "person_hobby",
    joinColumn: { name: "fk_person" },
    inverseJoinColumn: { name: "fk_hobby" },
  })
  hobbies: Hobby[];

  @ManyToOne(() => Subdivision, (subdivision) => subdivision.people, {
    nullable: true,
  })
  @JoinColumn({ name: "fk_subdivision" })
  subdivision: Subdivision;

  @ManyToOne(() => User, (user) => user.registered, {
    nullable: true,
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "fk_registrar" })
  registrar: User;
}
