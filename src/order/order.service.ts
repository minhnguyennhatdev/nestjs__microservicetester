import { CustomConfig } from './../circuit-breaker/interfaces/custom-config';
import { Observable, firstValueFrom } from 'rxjs';
import { ResponseHandler } from './../types/response/responsehandler.type';
import { OrderRepository } from './order.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './models/dto/request/create-order-request';
import { Order } from './models/order/order.class';
import { ClientProxy } from '@nestjs/microservices';
import { GetBooksByIdsResponse } from './models/dto/microserviceresponse/get-books-by-ids-response';
import { CircuitBreakerProtected } from 'src/circuit-breaker';

const circuitBreakerOptions = {
  circuitBreakerSleepWindowInMilliseconds: 3000,
  circuitBreakerErrorThresholdPercentage: 50,
  circuitBreakerRequestVolumeThreshold: 10,
  timeout: 10000,
  statisticalWindowLength: 10000,
  statisticalWindowNumberOfBuckets: 10,
  percentileWindowLength: 10000,
  percentileWindowNumberOfBuckets: 10,
  requestVolumeRejectionThreshold: 0,
  fallbackTo: undefined,
  shouldErrorBeConsidered: undefined,
};
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

  @CircuitBreakerProtected(circuitBreakerOptions)
  async createOrder(
    createOrderRequest: CreateOrderRequest,
  ): Promise<ResponseHandler<Order>> {
    const result: Observable<GetBooksByIdsResponse> =
      await this.getBooksByIds_Microservice(createOrderRequest.ids);

    const detail = await firstValueFrom(result);

    await Promise.all(
      detail.data.map(async (e) => {
        e.bookid = e.id;
        delete e.id;
      }),
    );

    const order = await this.orderRepository.createOrder({
      ...createOrderRequest,
      orderDetails: detail.data,
    });
    return new ResponseHandler({ data: order }).SuccessResponse();
  }

  async getBestSeller() {
    const bestseller = await this.orderRepository.getBestSeller();
    // if (!bestseller || isNaN(bestseller))
    //   return new ResponseHandler({
    //     message: 'Could not get best seller',
    //   }).ErrorResponse();
    return new ResponseHandler({ data: bestseller }).SuccessResponse();
  }

  async getBooksByIds_Microservice(ids: number[]) {
    const pattern = { cmd: 'get_books_byIds' };
    return await this.client.send(pattern, { ids });
  }
}
