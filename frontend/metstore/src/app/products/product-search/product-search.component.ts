import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  paramsSub!: Subscription;
  searchedName!: string;
  constructor(
    private route: ActivatedRoute,
    private prodService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSub = this.route.queryParamMap.subscribe((params: Params) => {
      this.searchedName = params.params.name;
    });
    this.getFilteredProducts(this.searchedName);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  //Retorna produtos que possuem o termo pesquisado em seu nome
  getFilteredProducts(searchQuery: string) {
    this.prodService.getAllProducts().subscribe((res: Product[]) => {
      this.products = res.filter((prod) => {
        return prod.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }

  onSearch(search: string) {
    if (search == '') {
      this.router.navigate(['products/list']);
    }
    this.searchedName = search;
    this.getFilteredProducts(search);
  }
}
