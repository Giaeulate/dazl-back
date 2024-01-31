import { Inject, Injectable } from '@nestjs/common';
import { UserLiveAllByUserSearcher } from '../search-all-by-user/UserLiveAllByUserSearcher';
import { USER_LIVE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { TimeActivation } from '../../../../../apps/dazl/backend/config/TimeActivation';

type Params = {
  userId: string;
};

@Injectable()
export class UserLiveStatusHoldingChanger {
  constructor(
    private readonly liveAllByUserSearcher: UserLiveAllByUserSearcher,
    @Inject(USER_LIVE_REPOSITORY)
    private readonly userLiveRepository: UserLiveRepository,
  ) {}

  public async run({ userId }: Params): Promise<void> {
    const lives = await this.liveAllByUserSearcher.run(userId);
    const livesInactives = lives.every(
      (live) => live.status.value === 'inactive',
    );
    if (livesInactives) {
      let timeLive = TimeActivation.REACTIVE_LIVES;
      for (const livesInactive of lives) {
        livesInactive.holdingLive(timeLive);
        await this.userLiveRepository.save(livesInactive);
        timeLive = timeLive + TimeActivation.REACTIVE_LIVES;
      }
    }
  }
}
