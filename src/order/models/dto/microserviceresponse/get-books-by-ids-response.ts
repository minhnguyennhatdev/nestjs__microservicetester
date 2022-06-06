import { OrderDetail } from './../../orderDetail/orderDetail.class';
export class GetBooksByIdsResponse {
  statusCode: number;
  message: string;
  data: OrderDetail[];
}
