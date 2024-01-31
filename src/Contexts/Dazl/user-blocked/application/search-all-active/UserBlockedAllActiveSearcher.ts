import { Inject, Injectable } from '@nestjs/common';
import { UserBlocked } from '../../domain/UserBlocked';
import { USER_BLOCK_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserBlockedRepository } from '../../domain/UserBlockedRepository';
import { UserBlockedAllSearcher } from '../search-all/UserBlockedAllSearcher';

@Injectable()
export class UserBlockedAllActiveSearcher {
  private readonly userBlockedAllSearcher: UserBlockedAllSearcher;
  constructor(
    @Inject(USER_BLOCK_REPOSITORY)
    repository: UserBlockedRepository,
  ) {
    this.userBlockedAllSearcher = new UserBlockedAllSearcher(repository);
  }

  public async run(): Promise<Array<UserBlocked>> {
    const userBlockeds = await this.userBlockedAllSearcher.run();
    return userBlockeds.filter((userBlocked) => userBlocked.isActive());
  }
}
