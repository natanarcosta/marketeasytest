import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertsService } from '../alerts/alerts.service';
import { Category } from '../shared/enums/category.enum';
import { Product } from '../shared/models/product.model';
const url = environment.productsUrl;
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private alertService: AlertsService) {}

  productsChanged = new Subject<Product[]>();

  getAllProducts() {
    //Retorna todos produtos
    return this.http.get<Product[]>(url);
  }

  getProductById(id: number) {
    //Retorna um produto baseado no ID do mesmo
    return this.http.get<Product>(url + id);
  }

  getCategories() {
    //Returns an array with all the avaiable categories.
    return Object.values(Category);
  }

  getProductsByCategory(category: Category) {
    return this.http.get<Product[]>(url.concat('category/') + category);
  }

  createProduct(newProduct: Product) {
    //Cria um produto e envia uma array atualizada com os produtos disponíveis.
    return this.http.post(url, newProduct).subscribe(() => {
      this.getAllProducts().subscribe((products: Product[]) => {
        this.alertService.show(`${newProduct.name}`, 'Produto criado com sucesso!', false);
        this.productsChanged.next(products);
      });
    });
  }

  updateProduct(updatedProduct: Product) {
    //Atualiza um produto e envia uma array atualizada com os produtos disponíveis.
    return this.http
      .put(url + updatedProduct.id, updatedProduct)
      .subscribe(() => {
        this.getAllProducts().subscribe((products: Product[]) => {
          this.alertService.show(`${updatedProduct.name}`, 'Produto atualizado com sucesso!', false)
          this.productsChanged.next(products);
        });
      });
  }

  deleteProduct(id: number) {
    //Deleta um produto e envia uma array atualizada com os produtos disponíveis.
    return this.http.delete(url + id).subscribe(() => {
      this.getAllProducts().subscribe((products: Product[]) => {
        this.alertService.show('', 'Produto deletado com sucesso!', false);
        this.productsChanged.next(products);
      });
    });
  }
}
