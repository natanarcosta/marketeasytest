import { Module } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ProductsService]
})
export class OrdersModule {}
