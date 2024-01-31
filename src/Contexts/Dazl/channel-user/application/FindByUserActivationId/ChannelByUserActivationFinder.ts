import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

@Injectable()
export class ChannelByUserActivationFinder {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
  ) {}

  async run({ userActivationId }: { userActivationId: UserActivationId }) {
    return await this.channelUserRepository.searchByUserActivationId(
      userActivationId,
    );
  }
}
