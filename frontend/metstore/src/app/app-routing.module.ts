import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './products/product-list/product-details/product-details.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductSearchComponent } from './products/product-search/product-search.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'search', component: ProductSearchComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'orders', component: OrdersComponent},
  { path: 'admin', component: ManagementComponent, children:[
    {path: 'new', component: ProductDetailsComponent},
    {path: 'edit/:id', component: ProductDetailsComponent}
  ] },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
