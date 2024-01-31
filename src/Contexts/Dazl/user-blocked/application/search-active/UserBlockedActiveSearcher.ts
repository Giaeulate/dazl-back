import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserBlocked } from '../../domain/UserBlocked';
import { USER_BLOCK_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { UserBlockedId } from '../../domain/UserBlockedId';

type Params = {
  id: string;
};

@Injectable()
export class UserBlockedActiveSearcher {
  constructor(
    @Inject(USER_BLOCK_REPOSITORY)
    private readonly repository: UserBlockedRepository,
  ) {}

  public async run({ id }: Params): Promise<UserBlocked> {
    const userBlocked = await this.repository.search(new UserBlockedId(id));
    if (!userBlocked) {
      throw new NotFoundException('User blocked not found');
    }
    if (userBlocked.isActive()) {
      return userBlocked;
    } else {
      throw new NotFoundException('User blocked is not active');
    }
  }
}
