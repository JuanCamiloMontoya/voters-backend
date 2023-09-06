import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Division } from "src/entities/geographic/division.entity";
import { Subdivision } from "src/entities/geographic/subdivision.entity";
import { Hobby } from "src/entities/voters/hobby.entity";
import { Occupation } from "src/entities/voters/occupation.entity";
import { UsersModule } from "../users/users.module";
import { GeneralController } from "./general.controller";
import { GeneralService } from "./general.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Division, Subdivision, Hobby, Occupation]),
    UsersModule,
  ],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}
