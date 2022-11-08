import { Module } from "@nestjs/common"
import { CommonModule } from "./@common/common.module"
import { UsersModule } from "./modules/users/users.module"
import { VotersModule } from './modules/voters/voters.module'
import { AuthModule } from "./modules/auth/auth.module"

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    VotersModule
  ]
})
export class AppModule { }