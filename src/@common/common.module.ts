import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "./config/app.config";
import authConfig from "./config/auth.config";
import databaseConfig from "./config/database.config";
import sendgridConfig from "./config/sendgrid.config";
import whaticketConfig from "./config/whaticket.config";
import { SendgridService } from "./services/sendgrid/sendgrid.service";
import { WhaticketService } from "./services/whaticket/whaticket.service";
import { HttpModule } from "@nestjs/axios";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [
        appConfig,
        databaseConfig,
        authConfig,
        sendgridConfig,
        whaticketConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get("database"),
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get("whaticket.baseUrl"),
        headers: {
          Authorization: `Bearer ${configService.get("whaticket.token")}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SendgridService, WhaticketService],
  exports: [SendgridService, WhaticketService],
})
export class CommonModule {}
