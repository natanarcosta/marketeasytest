import { Body, Controller, Param, Put } from '@nestjs/common';
import { ExchangeProductDto } from './dtos/exchange-product.dto';
import { ExchangesService } from './exchanges.service';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exchangesService: ExchangesService) {}

  @Put('/:id')
  exchangeProduct(
    @Param('id') orderId: string,
    @Body() exchange: ExchangeProductDto,
  ) {
    return this.exchangesService.exchangeProduct(+orderId, exchange);
  }
}
