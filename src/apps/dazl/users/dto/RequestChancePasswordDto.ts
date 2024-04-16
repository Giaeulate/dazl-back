import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestChancePasswordDto {

  @ApiProperty({ description: 'Correo electrónico del usuario', default: '@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', default: '12345678' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Correo electrónico del usuario', default: '' })
  @IsNotEmpty()
  code: string;
}
