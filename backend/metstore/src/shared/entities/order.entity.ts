import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-json',
  })
  products: {
    productId: number;
    quantity: number;
  }[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  totalPrice: number;
  productList: Product[];
  order: Promise<Order>;
}
