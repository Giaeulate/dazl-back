import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { FinderChannelUserService } from '../finder/finder-channel-user.service';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';
import { ChannelUserId } from '../../domain/ChannelUserId';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

@Injectable()
export class UpdaterChannelUser {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    private readonly finderChannelUserService: FinderChannelUserService,
  ) {}

  async run(
    id: ChannelUserId,
    plainData: { channelId: string; userActivationId: string },
  ): Promise<void> {
    const channelUser = await this.finderChannelUserService.run(id);

    channelUser.channelId = plainData.channelId
      ? new ChannelId(plainData.channelId)
      : channelUser.channelId;
    channelUser.userActivationId = plainData.userActivationId
      ? new UserActivationId(plainData.userActivationId)
      : channelUser.userActivationId;

    channelUser.updatedAt = new UpdatedAt(new Date().toISOString());

    await this.channelUserRepository.save(channelUser);
  }
}
