import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}
  orders: Order[] = [];
  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }
}
