import { Category } from '../enums/category.enum';

export class Product {
  id!: number;
  name!: string;
  price!: number;
  category!: Category;
  quantity!: number;

  constructor(_name: string, _price: number, _category: Category){
    this.name = _name;
    this.price = _price;
    this.category = _category;
  }
}
