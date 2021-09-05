import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { Order } from 'src/shared/entities/order.entity';
import { Product } from 'src/shared/entities/product.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private productsService: ProductsService) {}
  orders: Order[] = [];

  createOrder(newOrder: CreateOrderDTO) {
    const orderId = this.orders.length + 1;
    //Cria uma array de IDs de produtos associados com este pedido
    let productsIds: number[] = [];
    newOrder.products.forEach((product) => productsIds.push(product.productId));
    //Cria uma array de produtos com os IDs passados anteriormente
    let orderProducts: Product[] = this.getProducts(productsIds);
    //Atualiza a quantidade de cada produto
    orderProducts.forEach((product) => {
      product.quantity = newOrder.products.find(
        (orderProd) => orderProd.productId === product.id,
      ).quantity;
    });
    let order: Order = new Order(orderId, orderProducts);
    order.totalPrice = this.getTotalPrice(order);
    return this.orders.push(order);
  }

  addOrder(order: Order) {
    return this.orders.push(order);
  }

  getAllOrders() {
    return this.orders;
  }

  getOrderById(id: number) {
    const order = this.orders.find((_order) => _order.id === id);
    if (!order) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    return order;
  }

  updateOrder(id: number, updatedOrder: Order) {
    const index = this.getOrderIndex(id);
    this.orders[index].id = id;
    this.orders[index].productList = updatedOrder.productList;
    this.orders[index].totalPrice = updatedOrder.totalPrice;
    return this.getOrderById(id);
  }

  deleteOrder(id: number) {
    const index = this.getOrderIndex(id);
    return this.orders.splice(index, 1);
  }

  getOrderIndex(id: number) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index < 0) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    return index;
  }

  getProducts(ids: number[]): Product[] {
    let products: Product[] = [];
    ids.forEach((productId) =>
      products.push(this.productsService.getProductById(productId)),
    );
    return products;
  }

  getTotalPrice(order: Order) {
    let totalPrice = 0;
    order.productList.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  }
}
