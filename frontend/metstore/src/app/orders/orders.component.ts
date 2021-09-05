import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../shared/models/order.model';
import { ExchangeService } from './exchange-product/exchange.service';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private exchangeService: ExchangeService
  ) {}
  orders: Order[] = [];
  subscription!: Subscription;
  ngOnInit(): void {
    this.getOrders();
    this.subscription = this.exchangeService.onProdExchanged.subscribe(() => {
      this.getOrders();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onExchangeProduct(id: number, orderId: number) {
    this.router.navigate(['exchange'], {
      queryParams: { id: id, orderId: orderId },
    });
  }
  //Busca os pedidos e ordena em ordem crescente de IDs
  getOrders() {
    this.ordersService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders.sort((a, b) => (a.id > b.id ? 1 : -1));
    });
  }
}
