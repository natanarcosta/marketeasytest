import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  products: Product[] = [];

  constructor(private prodService: ProductsService) {}

  ngOnInit(): void {
    this.prodService.getAllProducts().subscribe((res) => (this.products = res));
  }
}
