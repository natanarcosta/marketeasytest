import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Category } from '../shared/enums/category.enum';
import { CartService } from '../shopping-cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];
  prodsInCartCount = 0;
  subscription = new Subscription();
  constructor(
    private router: Router,
    private prodService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    //Carrega a lista de categorias para o dropdown no cabeçalho
    this.categories = this.prodService.getCategories();
    //Atualiza o ícone mostrando a quantidade de produtos no carrinho
    this.prodsInCartCount = this.cartService.getProdsInCartCount();
    this.subscription = this.cartService.cartChanged.subscribe(() => {
      this.prodsInCartCount = this.cartService.getProdsInCartCount();
    });
  }

  onToCart() {
    this.router.navigate(['cart']);
  }

  onSearch(searched: HTMLInputElement) {
    this.router.navigate(['search'], {
      queryParams: { product: searched.value },
    });
  }
}
