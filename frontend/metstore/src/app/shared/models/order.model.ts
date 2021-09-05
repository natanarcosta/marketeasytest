import { Product } from './product.model';

export class Order {
  id!: number;
  totalPrice!: number;
  products!: {productId: number, quantity: number}[];
  productList!: Product[];
}
