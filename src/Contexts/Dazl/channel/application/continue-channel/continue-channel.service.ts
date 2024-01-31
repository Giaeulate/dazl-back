import { Inject, Injectable } from '@nestjs/common';
import {
  CHANNEL_REPOSITORY,
  CHANNEL_USER_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { ChannelId } from '../../domain/ChannelId';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';

import {
  ChannelSecondChance,
  ChannelSecondChanceTypes,
} from '../../domain/ChannelSecondChance';
import { UpdatedAt } from '../../../../Shared/domain/UpdatedAt';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';
import { ContinueChannelRequestDto } from './dto/ContinueChannelRequestDto';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { ChannelUserIInvited } from '../../../channel-user/domain/ChannelUserIInvited';
import { ChannelUserSomeoneInvitedMe } from '../../../channel-user/domain/ChannelUserSomeoneInvitedMe';
import { GetterCronService } from '../getter-cron/getter-cron.service';
import { UsersActiveFileUserDto } from '../../../user_activation/domain/dto/indexDto';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';

@Injectable()
export class ContinueChannelService {
  constructor(
    @Inject(CHANNEL_REPOSITORY)
    private readonly channelRepository: ChannelRepository,
    @Inject(CHANNEL_USER_REPOSITORY)
    private readonly channelUserRepository: ChannelUserRepository,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly moduleGateway: ModuleGateway,
    private readonly getterCronService: GetterCronService,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
  ) {}

  async run(
    idChannel: string,
    request: ContinueChannelRequestDto,
  ): Promise<void> {
    const { userActivationToId, userActivationId, message } = request;

    const channel = await this.channelRepository.search(
      new ChannelId(idChannel),
    );

    const userChannels = await this.channelUserRepository.searchByChannelId(
      channel.id,
    );
    const userChannelMe = userChannels.find(
      (value) => value.userActivationId.value === userActivationId,
    );
    userChannelMe.iInvited = new ChannelUserIInvited(1);
    await this.channelUserRepository.save(userChannelMe);

    const userChannelTo = userChannels.find(
      (value) => value.userActivationId.value === userActivationToId,
    );
    userChannelTo.someoneInvitedMe = new ChannelUserSomeoneInvitedMe(
      request.message,
    );
    await this.channelUserRepository.save(userChannelTo);

    const isNeutral = channel.secondChance.equals(
      new ChannelSecondChance(ChannelSecondChanceTypes.NEUTRAL),
    );

    const userActivation = await this.finderUserActivationService.run(
      new UserActivationId(userActivationId),
    );
    const file = await this.fileFinderService.invoke(
      userActivation.fileImageId,
    );
    const user = await this.userFinderService.invoke(userActivation.userId);
    const userActivationTo = await this.finderUserActivationService.run(
      new UserActivationId(userActivationToId),
    );
    if (isNeutral) {
      // channel.secondChance = new ChannelSecondChance(
      //   ChannelSecondChanceTypes.ACCEPTED,
      // );
      channel.updatedAt = new UpdatedAt(new Date().toISOString());
      await this.channelRepository.save(channel);
      const timeLeft = this.getterCronService.run(channel);
      this.moduleGateway.wss
        .to(userActivationTo.userId.value)
        .emit(ChannelName.SECOND_CHANCE, {
          userActivation: new UsersActiveFileUserDto(
            userActivation.toPrimitives().convertToDto(),
            file,
            user,
          ),
          message,
          secondChance: channel.secondChance.value === 'accepted',
          timeLeft,
          timeAdded: new Date().toISOString(),
          userActivationTo: userActivationTo.id.value,
          channelId: channel.id.value,
        });
    }
  }
}
