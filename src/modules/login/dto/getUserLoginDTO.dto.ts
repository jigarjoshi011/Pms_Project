import {
  IsEmail,
  IsInt,
  IsLowercase,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class getUserLoginDTO {
  @IsEmail()
  @IsString()
  @IsLowercase()
  email: string;

  @IsInt()
  @Min(0)
  @Max(10)
  @IsString()
  password: string;
}
