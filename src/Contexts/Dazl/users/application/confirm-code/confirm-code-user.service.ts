import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { UserEmail } from '../../domain/UserEmail';
import { User } from '../../domain/User';
import { UserConfirmationCode } from '../../domain/UserConfirmationCode';

@Injectable()
export class ConfirmCodeUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async run(code: string, email: string): Promise<string> {
    const user = await this.userRepository.searchByEmail(new UserEmail(email));
    this.ensureUserEmailExist(user);
    this.ensureCodeIsValid(user, code);
    return 'Code is valid';
  }

  private ensureUserEmailExist(user: User) {
    if (!user) {
      throw new NotFoundException('User with email not found');
    }
  }

  private ensureCodeIsValid(user: User, code: string) {
    if (!user.confirmationCode.equals(new UserConfirmationCode(code))) {
      throw new BadRequestException('Code is not valid');
    }
  }
}
