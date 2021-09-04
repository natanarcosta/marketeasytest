import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Order } from 'src/shared/entities/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}
  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(+id);
  }

  @Post()
  createOrder(@Body() newOrder: CreateOrderDTO) {
    return this.orderService.createOrder(newOrder);
  }

  @Put('/:id')
  updateOrder(@Param('id') id: string, updatedOrder: Order) {
    return this.orderService.updateOrder(+id, updatedOrder);
  }

  @Delete('/:id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(+id);
  }
}
