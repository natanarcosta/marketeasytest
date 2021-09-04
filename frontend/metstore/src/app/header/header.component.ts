import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Category } from '../shared/enums/category.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];
  constructor(private router: Router, private prodService: ProductsService) {}

  ngOnInit(): void {
    this.categories = this.prodService.getCategories();
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
