import { IsString } from 'class-validator';

export class addCategories {
  @IsString()
  category_name: string;

  @IsString()
  category_description: string;
}
