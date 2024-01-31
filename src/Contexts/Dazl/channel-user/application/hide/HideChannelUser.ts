import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

type Params = {
  channelId: string;
  userActivationId: string;
};

@Injectable()
export class HideChannelUser {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
  ) {}

  public async run({ channelId, userActivationId }: Params): Promise<void> {
    const channelUser =
      await this.channelUserRepository.searchByChannelIdAndUserActivationId(
        new ChannelId(channelId),
        new UserActivationId(userActivationId),
      );
    console.log('HideChannelUser');
    console.log(channelUser);

    if (channelUser) {
      channelUser.disguise();
      await this.channelUserRepository.save(channelUser);
    }
  }
}
