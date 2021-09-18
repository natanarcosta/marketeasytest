import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { Category } from 'src/shared/enums/category.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsPositive()
  price: number;

  @IsEnum(Category)
  category: Category;

  @IsUrl()
  image: string;

  @IsOptional()
  @IsNumber()
  quantity: number;
}
