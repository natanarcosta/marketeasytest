import {Injectable, NotFoundException, Scope} from '@nestjs/common';
import { Product } from 'src/shared/entities/product.entity';
import { Category } from 'src/shared/enums/category.enum';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable({scope: Scope.DEFAULT})
export class ProductsService {
  products: Product[] = [
    new Product('AMD Ryzen 5 3600', 1700, Category.CPU, 1),
    new Product('AMD Ryzen 7 5600', 2200, Category.CPU, 2),
    new Product('Intel Core I5-10400', 1150, Category.CPU, 3),
    new Product('RTX 2060', 2000, Category.GPU, 4),
    new Product('RTX 3090', 12000, Category.GPU, 5),
    new Product('RX 6900 XT', 10500, Category.GPU, 6),
    new Product('Headset Redragon Scylla', 110, Category.HEADSET, 7),
    new Product('Headset HyperX Cloud Stinger', 340, Category.HEADSET, 8),
    new Product('Headset Razer Kraken X Lite', 280, Category.HEADSET, 15),
    new Product('Keyboard Logitech MK235', 129, Category.KEYBOARD, 9),
    new Product('Keyboard Multilaser Slim', 30, Category.KEYBOARD, 16),
    new Product('Keyboard HyperX Mars RGB', 350, Category.KEYBOARD, 17),
    new Product('DDR4 RAM Crucial Ballistix 8GB DDR4', 310, Category.MEMORY, 10,),
    new Product('DDR4 RAM Kingston Fury Beast 8GB DDR4', 290, Category.MEMORY, 18,),
    new Product('DDR4 RAM XPG Gammix D30 16GB', 500, Category.MEMORY, 19),
    new Product('AOC Hero G/24 144hz', 1100, Category.MONITOR, 11),
    new Product('LG LED 21.5" 22MK400H', 840, Category.MONITOR, 20),
    new Product('Samsung LED 24" Full HD', 899, Category.MONITOR, 21),
    new Product('Logitech G403 HERO', 200, Category.MOUSE, 12),
    new Product('Redragon Cobra M711', 115, Category.MOUSE, 22),
    new Product('Multilaser Classic Full Black', 13, Category.MOUSE, 23),
    new Product('Kingston A400 240GB', 269, Category.SSD, 14),
    new Product('XPG S41 TUF 256GB', 310, Category.SSD, 24),
    new Product('Crucial BX500 420GB SATA', 390, Category.SSD, 25),
  ];

  createProduct(product: CreateProductDto) {
    product.id = this.products.length + 1;
    const newProduct = new Product(
      product.name,
      product.price,
      product.category,
      product.id,
    );
    return this.products.push(newProduct);
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    const product = this.products.find((product) => product.id == id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  getProductsByCategory(category: Category) {
    const products = this.products.filter(
      (product) => product.category === category,
    );
    if (!products.length) {
      throw new NotFoundException('No products found in this category!');
    }
    return products;
  }

  deleteProduct(id: number) {
    const index = this.getProductIndex(id);
    return this.products.splice(index, 1);
  }

  updateProduct(id: number, updatedProduct: CreateProductDto) {
    const index = this.getProductIndex(id);
    this.products[index].category = updatedProduct.category;
    this.products[index].name = updatedProduct.name;
    this.products[index].price = updatedProduct.price;
    return this.getProductById(id);
  }

  getProductIndex(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index < 0) {
      throw new NotFoundException('Product not found!');
    }
    return index;
  }
}
