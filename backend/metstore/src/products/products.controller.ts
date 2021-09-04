import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from 'src/shared/enums/category.enum';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }

  @Get('category/:category')
  getProductsByCategory(@Param('category') category: Category) {
    return this.productsService.getProductsByCategory(category);
  }

  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {
    return this.productsService.createProduct(newProduct);
  }

  @Put('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updatedProduct: CreateProductDto,
  ) {
    console.log(updatedProduct.name);
    return this.productsService.updateProduct(+id, updatedProduct);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
