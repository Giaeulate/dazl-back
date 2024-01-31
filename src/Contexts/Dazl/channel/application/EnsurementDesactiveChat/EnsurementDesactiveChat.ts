import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelRepository } from '../../domain/ChannelRepository';

@Injectable()
export class EnsurementDesactiveChat {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
  ) {}

  async run(): Promise<void> {
    const channels = await this.channelRepository.searchAll();
    for (const channel of channels) {
      const { active } = channel;
      if (active.isActive()) {
        const missingTime = channel.getMissingTime();
        if (missingTime < 0) {
          // channel.desactivate();
          await this.channelRepository.save(channel);
        }
      }
    }
  }
}
