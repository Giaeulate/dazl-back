import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { UserEmail } from '../../domain/UserEmail';

type Params = {
  email: string;
  code: string;
};

@Injectable()
export class UserConfirmEmailActivator {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async run({ email, code }: Params): Promise<void> {
    const user = await this.userRepository.searchByEmail(new UserEmail(email));
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (code !== user.emailConfirmationCode.value) {
      throw new BadRequestException('El código no es válido');
    }
    user.confirmEmail();
    await this.userRepository.save(user);
  }
}
