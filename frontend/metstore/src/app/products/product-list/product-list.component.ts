import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import Swal from 'sweetalert2';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  errorMessage = '';
  subscription!: Subscription;
  constructor(private prodService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.prodService.getAllProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (error) => {
        if (error.status == 0) {
          this.errorMessage =
            'Falha ao conectar-se ao servidor! Tente novamente atualizando a página!';
          Swal.fire({
            title: 'Erro',
            text: this.errorMessage,
            showConfirmButton: true,
            confirmButtonText: 'Ok',
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSearch() {}
}
