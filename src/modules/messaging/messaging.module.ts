import { Module } from "@nestjs/common";
import { MessagingService } from "./messaging.service";
import { MessagingController } from "./messaging.controller";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "src/entities/voters/person.entity";
import { Occupation } from "src/entities/voters/occupation.entity";
import { Hobby } from "src/entities/voters/hobby.entity";
import { Subdivision } from "src/entities/geographic/subdivision.entity";
import { Division } from "src/entities/geographic/division.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      Occupation,
      Hobby,
      Subdivision,
      Division,
    ]),
    UsersModule,
  ],
  providers: [MessagingService],
  controllers: [MessagingController],
})
export class MessagingModule {}
