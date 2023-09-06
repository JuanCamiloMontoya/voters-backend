import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication, appPrefix: string): void {
  const config = new DocumentBuilder()
    .setTitle("Voters APP")
    .setDescription("Documentación para Voters APP")
    .setVersion("1.0")
    .addBearerAuth(
      {
        description: "Ingrese JWT para autorizarse",
        type: "http",
        in: "header",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "defaultBearerAuth",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${appPrefix}/docs`, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
