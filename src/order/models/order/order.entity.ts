import { OrderDetailEntity } from './../orderDetail/orderDetail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer: string;

  @Column()
  address: string;

  @OneToMany(() => OrderDetailEntity, (orderdetail) => orderdetail.order, {
    cascade: true,
  })
  orderDetails: OrderDetailEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
