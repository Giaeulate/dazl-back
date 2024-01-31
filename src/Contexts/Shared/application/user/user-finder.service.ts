import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../Dazl/users/domain/UserRepository';
import { User } from '../../../Dazl/users/domain/User';
import { UserId } from '../../../Dazl/users/domain/UserId';
import { USER_REPOSITORY } from '../../domain/constants/constants';

@Injectable()
export class UserFinderService {
  @Inject(USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  public async invoke(id: UserId): Promise<User> {
    const user = await this.userRepository.search(id);
    this.ensureUserExists(user);
    return user;
  }

  private ensureUserExists(user: User) {
    // if (!user) throw new NotFoundException('User not found');
  }
}
