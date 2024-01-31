import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelId } from '../../../channel/domain/ChannelId';

@Injectable()
export class ChannelUserByChannelFinder {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
  ) {}

  async run(channelId: ChannelId) {
    return this.channelUserRepository.searchByChannelId(channelId);
  }
}
