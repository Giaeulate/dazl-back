import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { RequestChancePasswordDto } from './dto/RequestChancePasswordDto';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { UserConfirmationCode } from '../../domain/UserConfirmationCode';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/User';

@Injectable()
export class ChancePasswordService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run({
    code,
    password,
    email,
  }: RequestChancePasswordDto): Promise<void> {
    const user = await this.userRepository.searchByEmail(new UserEmail(email));
    this.ensureUserEmailExist(user);
    this.ensureCodeIsValid(user, code);
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    user.password = new UserPassword(passwordEncrypted);
    await this.userRepository.save(user);
  }

  private ensureUserEmailExist(user: User) {
    if (!user) {
      throw new NotFoundException(['User with email not found']);
    }
  }

  private ensureCodeIsValid(user: User, code: string) {
    if (!user.confirmationCode.equals(new UserConfirmationCode(code))) {
      throw new NotFoundException(['Code is not valid']);
    }
  }
}
