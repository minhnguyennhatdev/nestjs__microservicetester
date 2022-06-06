import { OrderDetail } from './../orderDetail/orderDetail.class';

export class Order {
  id: number;

  customer: string;

  address: string;

  orderDetails: OrderDetail[];
}
