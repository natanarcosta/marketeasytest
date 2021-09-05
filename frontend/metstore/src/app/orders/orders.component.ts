import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../shared/models/order.model';
import { ExchangeService } from './exchange-product/exchange.service';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private exchangeService: ExchangeService
  ) {}
  orders: Order[] = [];
  ngOnInit(): void {
    this.getOrders();
    // this.ordersService.getAllOrders().subscribe((orders: Order[]) => {
    //   this.getOrders();
    // });
    this.exchangeService.onProdExchanged.subscribe(() => {
      this.getOrders();
    });
  }
  onExchangeProduct(id: number, orderId: number) {
    this.router.navigate(['exchange'], {
      queryParams: { id: id, orderId: orderId },
    });
  }

  getOrders() {
    this.ordersService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders.sort((a, b) => a.id > b.id ? 1 : -1);
    });
  }
}
