import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEmail } from '../../domain/UserEmail';
import { User } from '../../domain/User';
import { SendMailService } from '../../../Shared/application/mailer/send-mail.service';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { UserConfirmationCode } from '../../domain/UserConfirmationCode';

@Injectable()
export class SendCodeEmailRecoverService {
  constructor(
    private readonly sendMailService: SendMailService,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async run(email: string): Promise<void> {
    const user = await this.userRepository.searchByEmail(new UserEmail(email));
    this.ensureUserEmailExist(user);
    const code = this.generateCode();
    user.confirmationCode = new UserConfirmationCode(code);
    await this.userRepository.save(user);
    await this.sendMailService.run(
      user.email.value,
      './confirmation',
      'Bienvenido a DAZL. ¡Confirma tu correo!',
      {
        code,
        name: user.firstName.value,
      },
    );
  }

  private ensureUserEmailExist(user: User) {
    if (!user) {
      throw new NotFoundException('User with email not found');
    }
  }

  // generate random code alphanumeric
  private generateCode(): string {
    return Math.random().toString(36).slice(-6).toUpperCase();
  }
}
