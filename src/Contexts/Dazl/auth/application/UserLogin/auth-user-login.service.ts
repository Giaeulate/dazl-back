import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserLoginRequestDto } from '../dto/user-login-request.dto';
import { UserEmail } from '../../../users/domain/UserEmail';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../domain/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthUserRepository } from '../../domain/AuthRepository';
import { AUTH_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UpdaterUserService } from '../../../users/application/updater/updater-user.service';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';

@Injectable()
export class AuthUserLoginService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(AUTH_REPOSITORY)
    private readonly authUserRepository: AuthUserRepository,
    private readonly updaterUserService: UpdaterUserService,
  ) {}

  async run(request: UserLoginRequestDto): Promise<any> {
    const { email, password } = request;
    const user = await this.authUserRepository.search(new UserEmail(email));
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.password) {
      if (!bcrypt.compareSync(password, user.password.value)) {
        throw new NotFoundException('Usuario o contraseña incorrectos');
      }
    }
    console.log('UNPROCESSABLE_ENTITY', user);
    if (!user.isActiveEmail()) {
      throw new UnprocessableEntityException('Usuario no activo');
    }
    const token = this.getJwtToken({
      id: user.id.value,
      email: user.email.value,
    });
    await this.updaterUserService.run(user.id, {
      tokenFirebase: request.token,
    });
    delete user.password;

    return {
      ...user.toPrimitives(),
      token,
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      jwtid: Uuid.random().toString(),
    });
  }
}
