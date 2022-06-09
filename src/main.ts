import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mircorservice = app.connectMicroservice<MicroserviceOptions>(
    // AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI as string],
        queue: 'order_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
