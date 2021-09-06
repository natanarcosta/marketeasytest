import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localPt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from './alerts/alerts.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

registerLocaleData(localPt);
@NgModule({
  declarations: [AppComponent, HeaderComponent, AlertsComponent],
  imports: [
    BrowserModule,
    ProductsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OrdersModule,
    ShoppingCartModule,
    NgbModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
