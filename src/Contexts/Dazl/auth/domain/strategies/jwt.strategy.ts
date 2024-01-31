import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../../users/domain/User';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserRepository } from '../AuthRepository';
import { ConfigService } from '@nestjs/config';
import { AuthEmail } from '../AuthEmail';
import { AUTH_REPOSITORY } from '../../../../Shared/domain/constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly userRepository: AuthUserRepository,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const searchByEmail = await this.userRepository.search(
      new AuthEmail(email),
    );

    if (!searchByEmail)
      throw new UnauthorizedException('El bearer token ha expirado');
    return searchByEmail;
  }
}
