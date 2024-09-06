import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Msc API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Usuário')
    .addTag('Professor')
    .addTag('Aluno')
    .addTag('Presença')
    .addTag('Auth')
    .addTag("Configurações")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
