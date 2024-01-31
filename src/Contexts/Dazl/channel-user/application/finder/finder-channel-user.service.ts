import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelUserId } from '../../domain/ChannelUserId';
import { ChannelUser } from '../../domain/ChannelUser';

@Injectable()
export class FinderChannelUserService {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
  ) {}
  async run(channelUserId: ChannelUserId) {
    const channelUser = await this.channelUserRepository.search(channelUserId);
    this.ensureChannelUserExists(channelUser);
    return channelUser;
  }

  private ensureChannelUserExists(channelUser: ChannelUser) {
    if (!channelUser) throw new NotFoundException('Channel User not found');
  }
}
