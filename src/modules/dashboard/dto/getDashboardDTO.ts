import { IsEmail, IsNumber, IsString } from 'class-validator';

export class checkDelete {
  @IsNumber()
  id: number;
}
export class updateDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  role: string;
}
