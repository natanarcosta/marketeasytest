import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../shared/enums/category.enum';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCart: Product[] = [];
  cartChanged = new Subject<Product[]>();
  constructor() {}

  addProduct(product: Product) {
    if (this.productsInCart.includes(product)) {
      const index = this.getProductIndex(product.id);
      this.productsInCart[index].quantity++;
    } else {
      product.quantity = 1;
      this.productsInCart.push(product);
    }
    return this.cartChanged.next(this.productsInCart);
  }

  removeProduct(id: number) {
    const index = this.getProductIndex(id);
    this.productsInCart.splice(index, 1);
    return this.cartChanged.next(this.productsInCart);
  }

  updateQnt(id: number, qnt: number) {
    const index = this.getProductIndex(id);
    return (this.productsInCart[index].quantity = qnt);
  }

  getProductIndex(id: number) {
    const index = this.productsInCart.findIndex((product) => product.id === id);
    if (index < 0) {
      throw new Error('Produto não encontrado!');
    }
    return index;
  }

  getProdsInCartCount() {
    return this.productsInCart.length;
  }

  clearCart() {
    this.productsInCart = [];
    this.cartChanged.next(this.productsInCart);
  }

  getCartTotalPrice(): number {
    let total = 0;
    this.productsInCart.forEach((prod) => {
      total += prod.quantity * prod.price;
    });
    console.log('Service total: ' + total);
    return total;
  }
}
