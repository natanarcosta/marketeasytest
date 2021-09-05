import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductSearchComponent } from './products/product-search/product-search.component';
import { ProductListItemComponent } from './products/product-list/product-list-item/product-list-item.component';
import { ProductDetailsComponent } from './products/product-list/product-details/product-details.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementComponent } from './management/management.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductSearchComponent,
    ProductListItemComponent,
    ProductDetailsComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ManagementComponent,
    OrdersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
