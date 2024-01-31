import { Inject, Injectable } from '@nestjs/common';
import { TimeActivation } from '../../../../../apps/dazl/backend/config/TimeActivation';
import { UserLiveCreator } from '../create/UserLiveCreator';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { USER_LIVE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserLiveRepository } from '../../domain/UserLiveRepository';

type Params = {
  userId: string;
};

@Injectable()
export class UserLiveByUserCreator {
  private readonly creator: UserLiveCreator;
  constructor(
    @Inject(USER_LIVE_REPOSITORY)
    private readonly userLiveRepository: UserLiveRepository,
  ) {
    this.creator = new UserLiveCreator(this.userLiveRepository);
  }

  public async run(params: Params): Promise<void> {
    const live = TimeActivation.LIVES;
    for (let i = 0; i < live; i++) {
      await this.creator.run({
        id: Uuid.random().toString(),
        userId: params.userId,
        active: 0,
      });
    }
  }
}
