import { IsArray } from 'class-validator';

export class CreateOrderDTO {
  @IsArray()
  //O pedido é criado apenas com os IDs dos produtos e suas quantidades
  products: {
    productId: number;
    quantity: number;
  }[];
}
