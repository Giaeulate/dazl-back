import { Inject, Injectable } from '@nestjs/common';
import { USER_LIVE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { UserLiveAllByUserSearcher } from '../search-all-by-user/UserLiveAllByUserSearcher';

type Params = {
  userId: string;
};

@Injectable()
export class UserLiveActive {
  private readonly userLiveAllByUserSearcher: UserLiveAllByUserSearcher;
  constructor(
    @Inject(USER_LIVE_REPOSITORY)
    private readonly userLiveRepository: UserLiveRepository,
  ) {
    this.userLiveAllByUserSearcher = new UserLiveAllByUserSearcher(
      this.userLiveRepository,
    );
  }

  public async run({ userId }: Params): Promise<void> {
    const usersLive = await this.userLiveAllByUserSearcher.run(userId);
    // console.log('usersLive', usersLive);
    const userLive = usersLive.find(
      (user) =>
        user.status.value === 'inactive' || user.status.value === 'holding',
    );
    console.log('userLive', userLive);
    if (userLive) {
      userLive.activeLive();
      await this.userLiveRepository.save(userLive);
    }
  }
}
