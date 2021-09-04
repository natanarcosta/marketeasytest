import { IsArray, IsNumber } from 'class-validator';

export class CreateOrderDTO {
  @IsArray()
  products: {
    productId: number;
    quantity: number;
  }[];
}
