import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/shared/models/product.model';
import { ExchangeService } from './exchange.service';

@Component({
  selector: 'app-exchange-product',
  templateUrl: './exchange-product.component.html',
  styleUrls: ['./exchange-product.component.css'],
})
export class ExchangeProductComponent implements OnInit, OnDestroy {
  oldProduct!: Product;
  orderId!: number;
  eligibleProducts: Product[] = [];
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService,
    private exchangeService: ExchangeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap.subscribe((params: Params) => {
      const id = +params.params.id;
      this.orderId = +params.params.orderId;
      this.prodService.getProductById(id).subscribe((prod: Product) => {
        this.oldProduct = prod;
        this.prodService
          .getProductsByCategory(this.oldProduct.category)
          .subscribe((res) => (this.eligibleProducts = res));
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onExchange(newProdId: number) {
    this.exchangeService.exchangeProducts(this.oldProduct.id, newProdId, this.orderId);
    this.router.navigate(['orders'])
  }
}
