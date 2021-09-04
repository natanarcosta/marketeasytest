import { IsNumber } from 'class-validator';

export class ExchangeProductDto {
  @IsNumber()
  oldProductId;

  @IsNumber()
  newProductId;
}
