import { IsNumber } from 'class-validator';

export class ExchangeProductDto {
  @IsNumber()
  oldProductId: number;

  @IsNumber()
  newProductId: number;
}
