import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../order/order.entity';

@Entity('order_detail')
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  order: OrderEntity;
}
