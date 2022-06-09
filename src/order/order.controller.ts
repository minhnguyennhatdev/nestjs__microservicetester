import { ExceptionFilter } from './../decorators/rpc-exception.filter';
import { ResponseHandler } from './../types/response/responsehandler.type';
import { OrderService } from './order.service';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CreateOrderRequest } from './models/dto/request/create-order-request';
import { MessagePattern } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Post()
  async createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    return this.orderService.createOrder(createOrderRequest);
  }

  @Get('/getbestseller')
  @UseFilters(new ExceptionFilter())
  @MessagePattern({ cmd: 'get_best_seller' })
  async getBestSeller() {
    return this.orderService.getBestSeller();
  }
}
