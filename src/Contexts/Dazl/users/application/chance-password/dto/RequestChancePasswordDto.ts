import { IsNotEmpty } from 'class-validator';

export class RequestChancePasswordDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  code: string;
}
