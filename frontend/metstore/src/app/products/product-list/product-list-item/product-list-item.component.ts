import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shopping-cart/cart.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
  @Input() product!: Product;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

  sendToCart(product: Product){
    this.cartService.addProduct(product);
  }

}
