import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginRequestDto {
    @ApiProperty({ description: 'Correo electrónico del usuario', default: '@gmail.com' })
    @IsNotEmpty({ message: 'El correo es requerida' })
    @IsEmail({}, { message: 'El correo no es válido' })
    readonly email: string;

    @ApiProperty({ description: 'Contraseña del usuario', default: '12345678' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    readonly password: string;

    @ApiProperty({ description: 'Token del usuario', default: '' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    readonly token: string;
}
