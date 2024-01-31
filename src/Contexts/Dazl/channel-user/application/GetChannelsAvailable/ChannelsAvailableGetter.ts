import { Inject, Injectable } from '@nestjs/common';
import { CHANNEL_USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

type Params = {
  userActivationId: UserActivationId;
};

@Injectable()
export class ChannelsAvailableGetter {
  constructor(
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
  ) {}

  async run(params: Params) {
    const { userActivationId } = params;
    return await this.channelUserRepository.searchByUserActivationId(
      userActivationId,
    );
  }
}
