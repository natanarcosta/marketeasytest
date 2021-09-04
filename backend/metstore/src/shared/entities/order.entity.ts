import { Product } from './product.entity';

export class Order {
  id: number;
  totalPrice: number;
  productList: Product[];

  constructor(_id: number, productList, totalPrice: number = 0) {
    this.id = _id;
    this.productList = productList;
    this.totalPrice = totalPrice;
  }
}
