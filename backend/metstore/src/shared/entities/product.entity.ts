import { Category } from '../enums/category.enum';

export class Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  quantity: number;
  image: string;

  constructor(
    _name: string,
    _price: number,
    _category: Category,
    _id?: number,
    _img?: string,
  ) {
    this.name = _name;
    this.price = _price;
    this.category = _category;
    this.id = _id;
    if (!_img) {
      this.image = this.getImage(this.category);
    } else {
      this.image = _img;
    }
  }

  //Adiciona uma imagem padrão de acordo com a categoria do produto, para produtos que não receberam o parametro 'image'
  getImage(category: Category): string {
    let image = '';
    switch (category) {
      case Category.CPU:
        image = 'https://i.imgur.com/BtFqaZq.jpg';
        break;
      case Category.GPU:
        image = 'https://i.imgur.com/BQg1fAi.jpg';
        break;
      case Category.HEADSET:
        image = 'https://i.imgur.com/WA6k5ug.jpg';
        break;
      case Category.KEYBOARD:
        image = 'https://i.imgur.com/w502CMz.jpg';
        break;
      case Category.MEMORY:
        image = 'https://i.imgur.com/V5dvvBg.jpg';
        break;
      case Category.MONITOR:
        image = 'https://i.imgur.com/m2tEqne.jpg';
        break;
      case Category.MOUSE:
        image = 'https://i.imgur.com/TD6VIhD.jpg';
        break;
      case Category.NOTEBOOK:
        image = 'https://i.imgur.com/dJYMdMS.jpg';
        break;
      case Category.SSD:
        image = 'https://i.imgur.com/i0nOLcx.jpg';
        break;
      default:
        image = '';
        break;
    }
    return image;
  }
}
