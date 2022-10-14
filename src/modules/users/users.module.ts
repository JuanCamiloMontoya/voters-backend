import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Person } from "src/entities/voters/person.entity"
import { Role } from "src/entities/user/role.entity"
import { User } from "src/entities/user/user.entity"
import { UserRole } from "src/entities/user/userRole.entity"
import { AuthModule } from "../auth/auth.module"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Person, UserRole, Role]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }