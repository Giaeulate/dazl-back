import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import {
  EVENT_BUS,
  USER_ACTIVATION_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { ChannelsAvailableGetter } from '../../../channel-user/application/GetChannelsAvailable/ChannelsAvailableGetter';
import { FinderChannelService } from '../../../channel/application/finder/finder-channel.service';
import { UserActivationExpirationDate } from '../../domain/UserActivationExpirationDate';
import { InvitationReceivedCanceler } from '../../../invitation/application/CancelReceived/InvitationReceivedCanceler';
import { InvitationSentCanceler } from '../../../invitation/application/CancelSent/InvitationSentCanceler';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivationToken } from '../../domain/UserActivationToken';
import { AuthRevoke } from '../../../auth/application/revoke/AuthRevoke';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelName } from '../../../../../apps/dazl/backend/gateways/constants';

type Params = {
  userActivationId: UserActivationId;
  token: UserActivationToken;
};

@Injectable()
export class UserActivationValidator {
  private readonly finder: UserActivationFinder;

  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly repository: UserActivationRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
    private readonly channelsAvailableGetter: ChannelsAvailableGetter,
    private readonly finderChannelService: FinderChannelService,
    private readonly invitationReceivedCanceler: InvitationReceivedCanceler,
    private readonly invitationSentCanceler: InvitationSentCanceler,
    private readonly moduleGateway: ModuleGateway,
  ) {
    this.finder = new UserActivationFinder(repository);
  }

  async run(params: Params) {
    const { userActivationId } = params;
    console.log('UserActivationValidator', userActivationId);
    const userActivation = await this.finder.run(userActivationId);
    if (!userActivation.isStillActive()) {
      const channelAvailable = await this.getChannelsAvailable(
        userActivationId,
        params.token,
      );
      if (channelAvailable)
        userActivation.addExpirationDate(
          new UserActivationExpirationDate(
            channelAvailable.getMissingTime().toString(),
          ),
        );

      userActivation.takeLives();
      userActivation.activeSession();
      await this.invitationReceivedCanceler.run({ userActivationId });
      await this.invitationSentCanceler.run({ userActivationId });
      await this.repository.save(userActivation);
      await this.eventBus.publish(userActivation.pullDomainEvents());
      // this.moduleGateway.wss.emit(ChannelName.IAM_ACTIVE, true);
    }
  }

  private async getChannelsAvailable(
    userActivationId: UserActivationId,
    token: UserActivationToken,
  ) {
    const channelsAvailable = await this.channelsAvailableGetter.run({
      userActivationId,
    });
    // console.log('channelsAvailable', channelsAvailable);
    if (channelsAvailable?.length === 0) {
      // await this.authRevoke.invalidateToken(token.value as string);
      throw new UnauthorizedException(
        `The user activation with id <${userActivationId.value}> has not channels available`,
      );
    }
    // console.log('getChannelsAvailable', channelsAvailable.length);

    const channelsPromise = channelsAvailable.map(
      async ({ channelId }) => await this.finderChannelService.run(channelId),
    );
    const channels = await Promise.all(channelsPromise);
    // console.log(
    //   'channels',
    //   channels.map((channel) => ({
    //     isStillActive: channel.isStillActive(),
    //     getMissingTime: channel.getMissingTime(),
    //   })),
    // );
    const channelSorted = channels
      .filter((channel) => channel.isStillActive())
      .sort((a, b) => b.getMissingTime() - a.getMissingTime());
    // console.log(
    //   'channelSorted',
    //   channelSorted.map((channel) => ({
    //     isStillActive: channel.isStillActive(),
    //     getMissingTime: channel.getMissingTime(),
    //   })),
    // );
    return channelSorted[0];
  }
}
