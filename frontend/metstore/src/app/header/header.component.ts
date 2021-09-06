import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../shared/enums/category.enum';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  prodsInCartCount = 0;
  subscription = new Subscription();
  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    //Atualiza o ícone mostrando a quantidade de produtos no carrinho
    this.prodsInCartCount = this.cartService.getProdsInCartCount();
    this.subscription = this.cartService.cartChanged.subscribe(() => {
      this.prodsInCartCount = this.cartService.getProdsInCartCount();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onToCart() {
    this.router.navigate(['cart']);
  }

}
