import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order.model';
const url = environment.ordersUrl;
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Order[]>(url);
  }

  createOrder() {}

  deleteOrder() {}

  updateOrder() {}
}
