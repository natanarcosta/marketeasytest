import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css'],
})
export class ProductManageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription!: Subscription;
  constructor(private prodService: ProductsService) {}

  ngOnInit(): void {
    this.prodService.getAllProducts().subscribe((res) => (this.products = res));

    this.subscription = this.prodService.productsChanged.subscribe(
      (res: Product[]) => {
        this.products = res;
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
