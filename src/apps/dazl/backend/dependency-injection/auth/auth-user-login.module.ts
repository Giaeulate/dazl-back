import { Module } from '@nestjs/common';
import { AuthUserLoginService } from '../../../../../Contexts/Dazl/auth/application/UserLogin/auth-user-login.service';
import { AuthUserLoginController } from '../../controllers/auth-user-login.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../../../../Contexts/Dazl/auth/domain/strategies/jwt.strategy';
import { AUTH_REPOSITORY_OBJECT } from '../constants';
import { AuthRevoke } from '../../../../../Contexts/Dazl/auth/application/revoke/AuthRevoke';

@Module({
  imports: [
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
  providers: [
    AuthUserLoginService,
    JwtStrategy,
    AUTH_REPOSITORY_OBJECT,
    AuthRevoke,
  ],
  controllers: [AuthUserLoginController],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthUserLoginModule {}
