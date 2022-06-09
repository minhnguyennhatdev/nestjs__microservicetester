import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { OrderDetailEntity } from './models/orderDetail/orderDetail.entity';
import { OrderEntity } from './models/order/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Logger, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import {
  addCircuitBreakerSupportTo,
  CustomConfig,
  CustomLogger,
} from 'src/circuit-breaker';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderDetailEntity]),
    ClientsModule.register([
      {
        name: 'BOOKS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ljyboqxj:OxdTm1kmqweO_FEBJeZr0IUCd0FUVqLy@armadillo.rmq.cloudamqp.com/ljyboqxj',
          ],
          queue: 'book_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
})
export class OrderModule {}
