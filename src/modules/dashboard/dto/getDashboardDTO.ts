import { IsNumber } from 'class-validator';

export class checkDelete {
  @IsNumber()
  id: number;
}
