import { IsString, IsNumber } from 'class-validator';

export class addCategories {
  @IsString()
  category_name: string;

  @IsString()
  category_description: string;
}

export class checkDelete {
  @IsNumber()
  id: number;
}
