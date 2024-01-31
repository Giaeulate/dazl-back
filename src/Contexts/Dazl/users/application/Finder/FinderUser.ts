import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';

@Injectable()
export class FinderUser {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run(id: UserId): Promise<User> {
    const user = await this.userRepository.search(id);
    this.ensureUserExist(user);
    return user;
  }

  private ensureUserExist(user: User) {
    if (!user) {
      // throw new NotFoundException('User not found');
    }
  }
}
