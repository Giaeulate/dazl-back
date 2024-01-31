import { Inject, Injectable } from '@nestjs/common';
import { USER_LIVE_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserLiveRepository } from '../../domain/UserLiveRepository';
import { UserLive } from '../../domain/UserLive';
import { TimeActivation } from '../../../../../apps/dazl/backend/config/TimeActivation';

type Params = {
  id: string;
  userId: string;
  active: number;
};

@Injectable()
export class UserLiveCreator {
  constructor(
    @Inject(USER_LIVE_REPOSITORY)
    private readonly userLiveRepository: UserLiveRepository,
  ) {}

  public async run(params: Params): Promise<void> {
    const expirationDate = new Date().getTime() + TimeActivation.REACTIVE_LIVES;
    const userLive = UserLive.create({
      id: params.id,
      userId: params.userId,
      active: params.active,
      activeDate: new Date().toISOString(),
      expirationDate: new Date(expirationDate).toISOString(),
    });
    await this.userLiveRepository.save(userLive);
  }
}
