import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelId } from '../../domain/ChannelId';
import { ChannelName } from '../../domain/ChannelName';
import { ChannelThumb } from '../../domain/ChannelThumb';
import { ChannelDescription } from '../../domain/ChannelDescription';
import { ChannelActive } from '../../domain/ChannelActive';
import { ChannelSecondChance } from '../../domain/ChannelSecondChance';
import { ChannelStartTime } from '../../domain/ChannelStartTime';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';

@Injectable()
export class UpdaterChannel {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
    private readonly finderChannelService: FinderChannelService,
  ) {}

  async run(
    id: ChannelId,
    plainData: {
      name?: string;
      thumb?: string;
      description?: string;
      active?: number;
      secondChance?: string;
      startTime?: string;
    },
  ): Promise<void> {
    const channel = await this.finderChannelService.run(id);

    channel.name = plainData.name
      ? new ChannelName(plainData.name)
      : channel.name;
    channel.thumb = plainData.thumb
      ? new ChannelThumb(plainData.thumb)
      : channel.thumb;
    channel.description = plainData.description
      ? new ChannelDescription(plainData.description)
      : channel.description;
    channel.active =
      plainData.active != undefined
        ? new ChannelActive(plainData.active)
        : channel.active;
    channel.secondChance = plainData.secondChance
      ? new ChannelSecondChance(plainData.secondChance)
      : channel.secondChance;
    channel.startTime = plainData.startTime
      ? new ChannelStartTime(plainData.startTime)
      : channel.startTime;

    channel.updatedAt = new UpdatedAt(new Date().toISOString());

    await this.channelRepository.save(channel);
  }
}
