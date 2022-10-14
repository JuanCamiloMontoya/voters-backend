import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const { appPort, appPrefix, appHostServer } = configService.get('app')
  app.setGlobalPrefix(appPrefix)
  app.enableCors()

  await app.listen(appPort || '4200')
  console.log(`Server running on 1 ${appHostServer}/${appPrefix}`)
}
bootstrap()