import { Module } from "@nestjs/common"
import { CommonModule } from "./@common/common.module"
import { UsersModule } from "./modules/users/users.module"
import { VotersModule } from './modules/voters/voters.module'
import { AuthModule } from "./modules/auth/auth.module"
import { OccupationModule } from './modules/occupation/occupation.module'

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    VotersModule,
    OccupationModule
  ]
})
export class AppModule { }