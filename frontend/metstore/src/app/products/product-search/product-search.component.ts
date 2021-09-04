import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param: Params) => {
      let _param = param.product;
    });
  }
}
