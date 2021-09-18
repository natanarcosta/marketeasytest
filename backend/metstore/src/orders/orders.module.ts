import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { Order } from 'src/shared/entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  exports: [OrdersService],
  providers: [OrdersService],
})
export class OrdersModule {}
