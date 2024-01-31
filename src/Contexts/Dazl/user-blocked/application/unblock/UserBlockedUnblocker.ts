import { Inject, Injectable } from '@nestjs/common';
import { UserBlockedActiveSearcher } from '../search-active/UserBlockedActiveSearcher';
import { USER_BLOCK_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';

type Params = {
  id: string;
};

@Injectable()
export class UserBlockedUnblocker {
  private readonly userBlockedActiveSearcher: UserBlockedActiveSearcher;

  constructor(
    @Inject(USER_BLOCK_REPOSITORY)
    private readonly repository: UserBlockedRepository,
  ) {
    this.userBlockedActiveSearcher = new UserBlockedActiveSearcher(repository);
  }

  public async run({ id }: Params): Promise<void> {
    const userBlocked = await this.userBlockedActiveSearcher.run({ id });
    userBlocked.unblock();
    await this.repository.save(userBlocked);
  }
}
