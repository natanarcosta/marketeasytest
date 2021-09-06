import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeProductComponent } from './orders/exchange-product/exchange-product.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductEditComponent } from './products/product-manage/product-edit/product-edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductSearchComponent } from './products/product-search/product-search.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductManageComponent } from './products/product-manage/product-manage.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'search', component: ProductSearchComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'exchange', component: ExchangeProductComponent },
  {
    path: 'admin',
    component: ProductManageComponent,
    children: [
      { path: 'new', component: ProductEditComponent },
      { path: 'edit/:id', component: ProductEditComponent },
    ],
  },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
