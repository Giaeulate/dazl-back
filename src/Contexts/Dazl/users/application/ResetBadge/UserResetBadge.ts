import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { UserTokenFirebase } from '../../domain/UserTokenFirebase';

@Injectable()
export class UserResetBadge {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run(token: UserTokenFirebase) {
    const user = await this.userRepository.searchByToken(token);
    if (!user)
      throw new NotFoundException(
        'firebase token User not found' + token.value,
      );
    user.resetBadge();
    await this.userRepository.save(user);
  }
}
