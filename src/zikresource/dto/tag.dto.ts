import { IsNotEmpty } from 'class-validator';

export class Tag {
  @IsNotEmpty()
  label: string;
  @IsNotEmpty()
  value: string;
}
