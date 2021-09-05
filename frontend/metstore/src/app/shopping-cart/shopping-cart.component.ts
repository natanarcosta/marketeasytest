import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsService } from '../alerts/alerts.service';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../shared/models/order.model';
import { Product } from '../shared/models/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  productsInCart: Product[] = [];
  grandTotal = 0;
  subscription!: Subscription;
  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cartChanged.subscribe(
      (prods: Product[]) => {
        this.productsInCart = prods;
        this.grandTotal = this.cartService.getCartTotalPrice();
      }
    );
    this.productsInCart = this.cartService.productsInCart;
    this.grandTotal = this.cartService.getCartTotalPrice();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClearCart() {
    this.cartService.clearCart(true);
  }

  onRemoveFromCart(id: number) {
    this.cartService.removeProduct(id);
  }

  onFinishOrder() {
    let order = new Order();
    order.products = [];
    //Adiciona o ID e a quantidade de cada produto ao objeto order
    this.productsInCart.forEach((prod: Product) => {
      order.products.push({ productId: prod.id, quantity: prod.quantity });
    });
    //Cria o pedido e redireciona para a página de pedidos
    this.orderService.createOrder(order).subscribe(() => {
      this.cartService.clearCart(false);
      this.alertService.show('', `Pedido criado com sucesso!`, false);
      this.router.navigate(['orders']);
    });
  }
}
