import { ChannelUser } from '../../domain/ChannelUser';
import { Inject } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';

export class CreatorChannelUserService {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
  ) {}

  async run({
    channel,
    userActivation,
  }: {
    channel: string;
    userActivation: string;
  }): Promise<ChannelUser> {
    const id = Uuid.random().value;
    const channelUser = ChannelUser.create({
      id: Uuid.random().value,
      userActivationId: userActivation,
      channelId: channel,
    });
    await this.channelUserRepository.save(channelUser);
    return channelUser;
  }
}
