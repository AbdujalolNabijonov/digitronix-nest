import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import LoggingInterceptor from './libs/interceptor/Logging.interceptor';
import { graphqlUploadExpress } from "graphql-upload"
import * as express from "express"
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use("/uploads", express.static("./uploads"))

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useWebSocketAdapter(new WsAdapter(app));

  app.enableCors({ origin: true, credentials: true })
  app.use(graphqlUploadExpress({ maxFileSize: 15000000, maxFiles: 10 }))
  
  await app.listen(process.env.PORT_API);
}
bootstrap();
