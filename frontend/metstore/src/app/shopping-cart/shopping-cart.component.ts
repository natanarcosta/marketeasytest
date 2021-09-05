import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shared/models/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  productsInCart: Product[] = [];
  grandTotal = 0;
  subscription!: Subscription;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cartChanged.subscribe(
      (prods: Product[]) => {
        this.productsInCart = prods;
        this.grandTotal = this.cartService.getCartTotalPrice();
      }
    );
    this.productsInCart = this.cartService.productsInCart;
    this.grandTotal = this.cartService.getCartTotalPrice();
    console.log(this.grandTotal);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onClearCart() {
    this.cartService.clearCart();
  }
  onRemoveFromCart(id: number) {
    this.cartService.removeProduct(id);
  }
}
