import { Inject, Injectable } from '@nestjs/common';
import { CancelerChannel } from '../canceler/canceler-channel';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { UserId } from '../../../users/domain/UserId';
import { FinderUserActivationByUserActiveService } from '../../../user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service';

@Injectable()
export class CancelChats {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    private readonly finderUserActivationByUserActiveService: FinderUserActivationByUserActiveService,
    private readonly canceler: CancelerChannel,
  ) {}

  async run(userId: UserId) {
    const userActivation =
      await this.finderUserActivationByUserActiveService.run(userId);
    if (userActivation) {
      const channelUsers =
        await this.channelUserRepository.searchByUserActivationId(
          userActivation.id,
        );
      for (const channelUser of channelUsers) {
        await this.canceler.run(channelUser.channelId);
      }
    }
  }
}
