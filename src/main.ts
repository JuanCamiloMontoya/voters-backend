import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const { appPort, appPrefix, appHostServer } = configService.get('app')
  app.setGlobalPrefix(appPrefix)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Voters APP')
    .setDescription('Documentación para Voters APP')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Ingrese JWT para autorizarse',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'defaultBearerAuth'
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(appPort || '4200')
  console.log(`Server running on 1 ${appHostServer}/${appPrefix}`)
}

bootstrap()