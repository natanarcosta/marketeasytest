import { LOCALE_ID, NgModule } from '@angular/core';
import localPt  from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
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
import { ExchangeProductComponent } from './orders/exchange-product/exchange-product.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
registerLocaleData(localPt);
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
    ExchangeProductComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}