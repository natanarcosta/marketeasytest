import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertsService } from '../alerts/alerts.service';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productsInCart: Product[] = [];
  cartChanged = new Subject<Product[]>();
  constructor(private alertService: AlertsService) {}

  addProduct(product: Product) {
    if (this.productsInCart.includes(product)) {
      const index = this.getProductIndex(product.id);
      this.productsInCart[index].quantity++;
    } else {
      product.quantity = 1;
      this.productsInCart.push(product);
    }
    this.alertService.show(
      '',
      product.name + ' adicionado ao carrinho!',
      false
    );
    return this.cartChanged.next(this.productsInCart);
  }

  removeProduct(id: number) {
    const index = this.getProductIndex(id);
    this.productsInCart.splice(index, 1);
    this.alertService.show('', 'Item removido do carrinho!', false);
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

  clearCart(showAlert: boolean) {
    this.productsInCart = [];
    this.cartChanged.next(this.productsInCart);
    if (showAlert) {
      this.alertService.show('', 'Carrinho esvaziado com sucesso!', false);
    }
  }

  getCartTotalPrice(): number {
    let total = 0;
    this.productsInCart.forEach((prod) => {
      total += prod.quantity * prod.price;
    });
    return total;
  }
}
