import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AlertsService } from '../alerts/alerts.service';
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
    private exchangeService: ExchangeService,
    private alertService: AlertsService
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

  onDeleteOrder(orderId: number) {
    Swal.fire({
      title: 'Confirmação',
      text: `Tem certeza de que deseja deletar o pedido de Nº ${orderId} ?`,
      showConfirmButton: true,
      confirmButtonText: 'Deletar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        return this.ordersService.deleteOrder(orderId).subscribe(() => {
          this.alertService.show(
            '',
            `Pedido Nº ${orderId} deletado com sucesso!`,
            false
          );
          this.getOrders();
        });
      }
      return;
    });
  }
}
