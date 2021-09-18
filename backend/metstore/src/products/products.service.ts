import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/shared/entities/product.entity';
import { Category } from 'src/shared/enums/category.enum';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async createProduct(product: CreateProductDto) {
    //Cria novo produto, com nome único.
    const newProduct = this.productsRepo.create(product);
    try {
      return await this.productsRepo.save(newProduct);
    } catch (err) {
      if (err.code == 23505) {
        throw new ForbiddenException('Produto já existe!');
      } else {
        throw new ForbiddenException(err.detail);
      }
    }
  }

  getAllProducts() {
    //Retorna todos produtos
    return this.productsRepo.find();
  }

  async getProductById(id: number) {
    //Retorna produto com ID informado
    const product = await this.productsRepo.findOne(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado!');
    }
    return product;
  }

  async getProductsByCategory(category: Category) {
    //Retorna todos produtos da categoria informada
    const products = await this.productsRepo
      .createQueryBuilder('product')
      .where('product.category = :category')
      .setParameters({ category: category })
      .getMany();
    if (!products.length) {
      throw new NotFoundException('Nenhum produto cadastrado nesta categoria!');
    }
    return products;
  }

  async deleteProduct(id: number) {
    //Deleta produto usando o index, que já verifica se o id informado é valido.
    const product = await this.getProductById(id);
    return this.productsRepo.remove(product);
  }

  async updateProduct(id: number, updatedProduct: UpdateProductDto) {
    //Atualiza produto.
    let product = await this.getProductById(id);
    product.name = updatedProduct.name;
    product.price = updatedProduct.price;
    product.category = updatedProduct.category;
    product.image = updatedProduct.image;
    return this.productsRepo.save(product);
  }
}
