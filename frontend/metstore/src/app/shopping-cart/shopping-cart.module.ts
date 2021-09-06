import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class ShoppingCartModule {}
