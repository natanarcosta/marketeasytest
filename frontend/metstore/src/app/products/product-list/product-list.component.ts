import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription!: Subscription;
  constructor(private prodService: ProductsService) {}

  ngOnInit(): void {
    this.subscription = this.prodService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
