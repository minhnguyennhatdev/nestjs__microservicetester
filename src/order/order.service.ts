import { ResponseHandler } from './../types/response/responsehandler.type';
import { OrderEntity } from './models/order/order.entity';
import { OrderRepository } from './order.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './models/dto/create-order-request';
import { Order } from './models/order/order.class';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject('BOOKS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async getAllOrders(): Promise<ResponseHandler<Order[]>> {
    const data = await this.orderRepository.getAllOrders();
    return new ResponseHandler({ data }).SuccessResponse();
  }

  async createOrder(data: Partial<Order>): Promise<ResponseHandler<Order>> {
    const result = await this.orderRepository.createOrder(data);
    return new ResponseHandler({ data: result }).SuccessResponse();
  }

  async getBooksByIds_Microservice(ids: number[]) {
    return await this.client.send('get_books_byIds', { ids });
  }
}
