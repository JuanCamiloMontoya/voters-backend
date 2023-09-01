import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { setupSwagger } from "./@common/utils/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const { appPort, appPrefix, appHostServer } = configService.get('app')
  app.setGlobalPrefix(appPrefix)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  setupSwagger(app, appPrefix)

  await app.listen(appPort || '4200')
  console.log(`Server running on 1 ${appHostServer}/${appPrefix}`)
}

bootstrap()