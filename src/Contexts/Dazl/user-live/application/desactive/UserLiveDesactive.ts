import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserLiveAllByUserSearcher } from '../search-all-by-user/UserLiveAllByUserSearcher';
import {
  EVENT_BUS,
  USER_LIVE_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';

type Params = {
  userId: string;
};

@Injectable()
export class UserLiveDesactive {
  private readonly userLiveAllByUserSearcher: UserLiveAllByUserSearcher;
  constructor(
    @Inject(USER_LIVE_REPOSITORY)
    private readonly userLiveRepository: UserLiveRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {
    this.userLiveAllByUserSearcher = new UserLiveAllByUserSearcher(
      this.userLiveRepository,
    );
  }

  public async run({ userId }: Params): Promise<void> {
    const usersLive = await this.userLiveAllByUserSearcher.run(userId);
    console.log('UserLiveDesactive');
    console.log('usersLive', usersLive);
    const userLive = usersLive.find((user) => user.status.value === 'active');
    console.log('userLive', userLive);
    console.log('UserLiveDesactive');
    if (userLive) {
      userLive.desactiveLive();
      await this.userLiveRepository.save(userLive);
      await this.eventBus.publish(userLive.pullDomainEvents());
    } else {
      throw new BadRequestException('No tienes vidas activas');
    }
  }
}
