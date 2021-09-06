import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ExchangeProductComponent } from './exchange-product/exchange-product.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [OrdersComponent, ExchangeProductComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class OrdersModule {}
