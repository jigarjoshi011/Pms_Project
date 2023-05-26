import { IsInt } from 'class-validator';

export class checkRequestProductidType {
  @IsInt()
  data: number;
}
