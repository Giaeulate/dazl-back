import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../database/mysql/models/entities/Users';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const expiresInHours = 8;
                const expiresInMinutes = 35;
                const expirationTime = expiresInHours * 60 * 60 + expiresInMinutes * 60; // Calcula el tiempo de expiración en segundos
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: expirationTime },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository]
})
export class AuthModule { }
