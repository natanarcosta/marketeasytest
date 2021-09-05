import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Category } from 'src/shared/enums/category.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsUrl()
  image: string;
}
