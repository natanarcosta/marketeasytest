import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Order } from 'src/shared/entities/order.entity';
import { Product } from 'src/shared/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
  ) {}
  orders: Order[] = [];

  createOrder(newOrder: CreateOrderDTO) {
    //Cria novo pedido
    const order = this.ordersRepo.create(newOrder);
    return this.ordersRepo.save(order);
  }

  async getAllOrders() {
    //Retorna todos pedidos
    let orders = await this.ordersRepo.find();
    for (let order of orders) {
      order = await this.updateOrderDetails(order);
    }
    return orders;
  }

  async getOrderById(id: number) {
    //Retorna pedido com ID informado
    let order = await this.ordersRepo.findOne(id);
    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }
    order = await this.updateOrderDetails(order);
    return order;
  }

  async updateOrderDetails(order: Order) {
    //Atualiza lista de pedidos usando os IDs e quantidades informados
    order.productList = await this.getOrderProducts(order);
    //Atualiza o preço total usando a lista de produtos e suas quantidades
    order.totalPrice = this.getOrderTotalPrice(order);
    return order;
  }

  async getOrderProducts(order: Order) {
    //Cria uma array de produtos com os IDs e quantidades informados
    let orderProducts: Product[] = [];
    for (const product of order.products) {
      let prod = await this.productsService.getProductById(product.productId);
      prod.quantity = product.quantity;
      orderProducts.push(prod);
    }
    return orderProducts;
  }

  getOrderTotalPrice(order: Order) {
    //Calcula o preço total do pedido
    let totalPrice = 0;
    order.productList.forEach((prod) => {
      totalPrice += prod.quantity * prod.price;
    });
    return totalPrice;
  }

  async updateOrder(id: number, updatedOrder: CreateOrderDTO) {
    //Atualiza o pedido usando o index, que já retorna erro caso o id passado seja inválido
    let order = await this.ordersRepo.findOne(id);
    order.products = updatedOrder.products;
    return this.ordersRepo.save(order);
  }

  async deleteOrder(id: number) {
    //Deleta um pedido usando o Index, que já retorna erro caso o id seja inválido.
    const order = await this.getOrderById(id);
    return this.ordersRepo.remove(order);
  }
}
