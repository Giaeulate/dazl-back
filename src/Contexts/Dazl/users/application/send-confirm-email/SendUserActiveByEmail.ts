import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { UserEmail } from '../../domain/UserEmail';
import { UserActiveEmailSender } from './UserActiveEmailSender';

type Params = {
  email: string;
};

@Injectable()
export class SendUserActiveByEmail {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly sender: UserActiveEmailSender,
  ) {}

  public async run({ email }: Params): Promise<void> {
    const user = await this.userRepository.searchByEmail(new UserEmail(email));
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.sender.run({
      email: user.email.value,
      code: user.emailConfirmationCode.value,
    });
  }
}
