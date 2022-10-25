import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CommonModule } from "./@common/common.module"
import appConfig from "./@common/config/app.config"
import authConfig from "./@common/config/auth.config"
import databaseConfig from "./@common/config/database.config"
import sendgridConfig from "./@common/config/sendgrid.config"
import { UsersModule } from "./modules/users/users.module"
import { VotersModule } from './modules/voters/voters.module'
import { AuthModule } from "./modules/auth/auth.module"
import { OccupationModule } from './modules/occupation/occupation.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig, authConfig, sendgridConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database')
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    VotersModule,
    OccupationModule
  ]
})
export class AppModule { }