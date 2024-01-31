import { Inject, Injectable } from '@nestjs/common';
import { USER_LIVE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserLiveRepository } from '../../domain/UserLiveRepository';

@Injectable()
export class UserLiveActiveExpirated {
  constructor(
    @Inject(USER_LIVE_REPOSITORY)
    private readonly userLiveRepository: UserLiveRepository,
  ) {}

  public async run() {
    const users = await this.userLiveRepository.searchAllNotActive();
    const usersExpirated = users.filter((user) => user.isExpirated());
    for (const user of usersExpirated) {
      if (user.status.value === 'holding') {
        user.activeLive();
        await this.userLiveRepository.save(user);
      }
    }
  }
}
