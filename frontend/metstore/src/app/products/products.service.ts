import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../shared/enums/category.enum';
import { Product } from '../shared/models/product.model';
const url = environment.productsUrl;
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  productsChanged = new Subject<Product[]>();

  getAllProducts() {
    return this.http.get<Product[]>(url);
  }

  searchProducts(searchedProd: string) {}

  getProductById(id: number) {
    return this.http.get<Product>(url + id);
  }

  getCategories() {
    return Object.values(Category);
  }

  createProduct(newProduct: Product) {
    return this.http.post(url, newProduct);
  }

  updateProduct(updatedProduct: Product) {
    console.log(updatedProduct);
    return this.http.put(url + updatedProduct.id, updatedProduct);
  }
}
