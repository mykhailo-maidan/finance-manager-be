import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'warn', 'verbose'],
  });
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
  .setTitle("Finance Manager")
  .setDescription("API for Finance Manager Project")
  .setVersion('1.0')
  .addTag("User")
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document);

  await app.listen(3000);
}
bootstrap();
