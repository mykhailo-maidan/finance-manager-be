import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './modules/app-config/appconfig.service';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'warn', 'verbose'],
  });
  app.useGlobalPipes(new ValidationPipe())

  const cfg = app.get(AppConfigService);

  const config = new DocumentBuilder()
  .setTitle("Finance Manager")
  .setDescription("API for Finance Manager Project")
  .setVersion('1.0')
  .addTag("User")
  .addOAuth2({
    type: 'oauth2',
    flows: {
      authorizationCode: {
        authorizationUrl: cfg.oauth2.authUrl,  
        tokenUrl: cfg.oauth2.tokenUrl, 
        scopes: {
          'profile': 'Access to user profile',
          'email': 'Access to email',
        },
      },
    },
    name: 'oauth2'
  })
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'bearerAuth',  // Reference for @ApiBearerAuth()
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: 'http://localhost:3000/api/oauth2-redirect.html', // Your local redirect URL
      initOAuth: {
        clientId: cfg.oauth2.clientId, 
        scopes: ['openid', 'profile', 'email'],
      },
    },
  });;
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Adjust to your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With','Access-Control-Allow-Origin','Access-Control-Allow-Headers','Access-Control-Allow-Methods'],
    credentials: true,
  };
  const yamlDocument = require('yaml').stringify(document);
  fs.writeFileSync('./swagger/swagger.yaml', yamlDocument);

  app.enableCors(corsOptions);


  await app.listen(3000);
}
bootstrap();
