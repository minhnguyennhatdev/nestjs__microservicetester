import { GetBooksByIdsResponse } from './models/dto/microserviceresponse/get-books-by-ids-response';
import { OrderService } from './order.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderRequest } from './models/dto/create-order-request';
import { firstValueFrom, Observable } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Post()
  async createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    const result: Observable<GetBooksByIdsResponse> =
      await this.orderService.getBooksByIds_Microservice(
        createOrderRequest.ids,
      );
    const detail = await firstValueFrom(result);

    return this.orderService.createOrder({
      ...createOrderRequest,
      orderDetails: detail.data,
    });
  }
}
