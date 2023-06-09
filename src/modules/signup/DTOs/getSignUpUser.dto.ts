import {
  IsEmail,
  IsInt,
  IsLowercase,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class getSignUpUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  @IsLowercase()
  email: string;

  @IsInt()
  @Min(0)
  @Max(10)
  password: string;
}

export class addRoleDto {
  @IsInt()
  userId: number;
}
