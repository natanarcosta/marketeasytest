import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeProductComponent } from './orders/exchange-product/exchange-product.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'exchange', component: ExchangeProductComponent },
  { path: '**', redirectTo: 'products/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
