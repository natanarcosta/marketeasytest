import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { ExchangeProductDto } from './dtos/exchange-product.dto';

@Injectable()
export class ExchangesService {
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  exchangeProduct(orderId: number, exchangeRequest: ExchangeProductDto) {
    let order = this.ordersService.getOrderById(orderId);
    const oldProduct = this.productsService.getProductById(
      exchangeRequest.oldProductId,
    );
    if (!order.productList.includes(oldProduct)) {
      throw new BadRequestException('Invalid product id!');
    }
    const oldProductIndex = order.productList.findIndex(
      (product) => product.id === oldProduct.id,
    );
    const newProduct = this.productsService.getProductById(
      exchangeRequest.newProductId,
    );
    newProduct.quantity = oldProduct.quantity;
    if (oldProduct.category != newProduct.category) {
      throw new BadRequestException(
        'Only products within the same category can be exchanged!',
      );
    }
    order.productList[oldProductIndex] = newProduct;
    order.totalPrice = this.ordersService.getTotalPrice(order);
    this.ordersService.deleteOrder(orderId);
    return this.ordersService.addOrder(order);
  }
}
