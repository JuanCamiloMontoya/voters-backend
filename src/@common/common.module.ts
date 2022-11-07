import { Global, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import appConfig from "./config/app.config"
import authConfig from "./config/auth.config"
import databaseConfig from "./config/database.config"
import sendgridConfig from "./config/sendgrid.config"
import { SendgridService } from "./services/sendgrid/sendgrid.service"

@Global()
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
    })
  ],
  providers: [SendgridService],
  exports: [SendgridService]
})
export class CommonModule { }