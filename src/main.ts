import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { LoggerInterceptor } from './utils/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  /* Limitar capacidad del servidor */
  app.use(json({
    limit: '200mb'
  }));

  app.useGlobalInterceptors(new LoggerInterceptor());

  // CONFIGURAR SWAGGER
  // 1.- Instalar npm i --save @nestjs/swagger
  // 2.- Configurar las siguientes lineas
  /* Configuración swagger */
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Mi primer API')
    .setDescription('Test de creación de API y su entorno de pruebas')
    .setVersion('1.0')
    .addTag('VIDEOS')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
/***********************************************************************/

  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  await app.listen(process.env.PORT);
}
bootstrap();
