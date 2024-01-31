import { Inject } from '@nestjs/common';
import { CHANNEL_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { Channel } from '../../domain/Channel';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';

export class CreatorChannelService {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
  ) {}

  async run(): Promise<Channel> {
    const id = Uuid.random().value;
    const channel = Channel.create({
      id: id,
      name: `Channel ${id}`,
      thumb: '',
      active: IsBoolean.TRUE,
      startTime: new Date().getTime().toString(),
      description: 'event.channelDescription',
    });
    await this.channelRepository.save(channel);
    return channel;
  }
}
