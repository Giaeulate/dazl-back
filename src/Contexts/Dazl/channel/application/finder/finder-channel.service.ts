import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CHANNEL_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { ChannelId } from '../../domain/ChannelId';
import { Channel } from '../../domain/Channel';

@Injectable()
export class FinderChannelService {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
  ) {}

  async run(channelId: ChannelId) {
    const channel = await this.channelRepository.search(channelId);
    this.ensureChannelExists(channel);
    return channel;
  }

  private ensureChannelExists(channel: Channel) {
    if (!channel) throw new NotFoundException('Channel not found');
  }
}
