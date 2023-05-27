import { IsString, IsNumber } from 'class-validator';

export class addProduct {
  @IsString()
  product_name: string;

  @IsString()
  product_categorie: string;

  @IsNumber()
  available_quantity: number;

  @IsNumber()
  product_price: number;

  @IsString()
  product_description: string;

  @IsString()
  filebutton: string;
}
export class EditProduct {
  @IsString()
  product_name: string;

  @IsString()
  product_categorie: string;

  @IsNumber()
  available_quantity: number;

  @IsNumber()
  product_price: number;

  @IsString()
  product_description: string;

  @IsString()
  filebutton: string;
}

export class checkDelete {
  @IsNumber()
  id: number;
}
