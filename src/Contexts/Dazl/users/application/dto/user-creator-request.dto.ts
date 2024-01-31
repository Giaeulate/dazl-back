import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserCreatorRequestDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  readonly lastName: string;

  @IsNotEmpty({ message: 'El género es requerido' })
  readonly gender: string;

  @IsNotEmpty({ message: 'La edad es requerido' })
  readonly age: number;

  readonly name: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsEmail({}, { message: 'El email no es válido' })
  readonly email: string;

  @IsNotEmpty({ message: 'La contraseña es requerido' })
  readonly password: string;

  @IsNotEmpty({ message: 'La confirmación de la contraseña es requerido' })
  readonly status: string;

  @IsNotEmpty({ message: 'La latitud es requerido' })
  readonly latitude: string;

  @IsNotEmpty({ message: 'La longitud es requerido' })
  readonly longitude: string;
}
