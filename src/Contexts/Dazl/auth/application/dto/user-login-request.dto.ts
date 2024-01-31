import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginRequestDto {
  @IsNotEmpty({ message: 'El correo es requerida' })
  @IsEmail({}, { message: 'El correo no es válido' })
  readonly email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  readonly password: string;
  readonly token: string;
}
