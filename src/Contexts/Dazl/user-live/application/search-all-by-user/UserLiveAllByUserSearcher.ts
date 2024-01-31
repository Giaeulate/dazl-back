import { Inject, Injectable } from '@nestjs/common';
import { USER_LIVE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { UserLive } from '../../domain/UserLive';

@Injectable()
export class UserLiveAllByUserSearcher {
  constructor(
    @Inject(USER_LIVE_REPOSITORY)
    private readonly userLiveRepository: UserLiveRepository,
  ) {}

  public async run(userId: string): Promise<Array<UserLive>> {
    const usersLive = await this.userLiveRepository.searchAll();
    return usersLive
      .filter((user) => user.userId.value === userId)
      .sort((a, b) => {
        if (a.expirationDate.value > b.expirationDate.value) {
          return 1;
        }
        if (a.expirationDate.value < b.expirationDate.value) {
          return -1;
        }
        return 0;
      });
  }
}
