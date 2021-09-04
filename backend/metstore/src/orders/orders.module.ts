import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ProductsModule],
  controllers: [OrdersController],
  exports: [OrdersService],
  providers: [OrdersService],
})
export class OrdersModule {}
