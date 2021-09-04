import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  products: Product[] = [];
  subscription!: Subscription;
  constructor(private prodService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.prodService.getAllProducts().subscribe((res) => (this.products = res));

    this.subscription = this.prodService.productsChanged.subscribe(
      (res: Product[]) => {
        this.products = res;
      }
    );
  }
}
