import { OrderDetailEntity } from './models/orderDetail/orderDetail.entity';
import { OrderDetail } from './models/orderDetail/orderDetail.class';
import { OrderEntity } from './models/order/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './models/order/order.class';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly order: Repository<Order>,
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetail: Repository<OrderDetail>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.order.find({
      relations: {
        orderDetails: true,
      },
    });
  }

  async createOrder(data: Partial<Order>): Promise<Order> {
    return this.order.save(data);
  }
}
