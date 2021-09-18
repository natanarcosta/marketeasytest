import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { ExchangeProductDto } from './dtos/exchange-product.dto';

@Injectable()
export class ExchangesService {
  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  async exchangeProduct(orderId: number, exchangeRequest: ExchangeProductDto) {
    //Carrega o pedido a ser editado e verifica se existe o produto a ser trocado
    let order = this.ordersService.getOrderById(orderId);
    const oldProduct = await this.productsService.getProductById(
      exchangeRequest.oldProductId,
    );
    if (!order.productList.includes(oldProduct)) {
      throw new NotFoundException('Este ID é inválido!');
    }
    const newProduct = await this.productsService.getProductById(
      exchangeRequest.newProductId,
    );
    newProduct.quantity = oldProduct.quantity;
    //Verifica se a categoria dos produtos é idêntica
    if (oldProduct.category != newProduct.category) {
      throw new BadRequestException(
        'Trocas só podem ser efetuadas entre produtos da mesma categoria!',
      );
    }
    //Index para substituir pelo novo produto
    const oldProductIndex = order.productList.findIndex(
      (product) => product.id === oldProduct.id,
    );
    order.productList[oldProductIndex] = newProduct;
    order.totalPrice = this.ordersService.getTotalPrice(order);
    this.ordersService.deleteOrder(orderId);
    return this.ordersService.addOrder(order);
  }
}
