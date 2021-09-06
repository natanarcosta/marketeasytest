import { IsEnum, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator';
import { Category } from 'src/shared/enums/category.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
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
