import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InvitationStatusAcceptedChangedDomainEvent } from '../../domain/InvitationStatusAcceptedChangedDomainEvent';
import { CreatorChannelService } from '../../../channel/application/creator/creator-channel.service';
import { CreatorChannelUserService } from '../../../channel-user/application/creator/creator-channel-user.service';
import { EVENT_BUS } from '../../../../Shared/domain/constants/constants';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { CreatorMessageService } from '../../../message/application/create/creator-message.service';
import { MessageTypeEnum } from '../../../message/domain/MessageType';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { UserId } from '../../../users/domain/UserId';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { UpdateActiveChatSender } from '../../../channel-user/application/SendUpdatedActiveChat/UpdateActiveChatSender';

@Injectable()
export class CreateChannelOnChangedInvitationStatus {
  constructor(
    private readonly creatorChannelService: CreatorChannelService,
    private readonly creatorChannelUserService: CreatorChannelUserService,
    private readonly creatorMessageService: CreatorMessageService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly updateActiveChatSender: UpdateActiveChatSender,

    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  @OnEvent(InvitationStatusAcceptedChangedDomainEvent.name)
  async on(event: InvitationStatusAcceptedChangedDomainEvent) {
    const channel = await this.creatorChannelService.run();

    await this.creatorChannelUserService.run({
      channel: channel.id.value,
      userActivation: event.userActivationFromId,
    });

    await this.creatorChannelUserService.run({
      channel: channel.id.value,
      userActivation: event.userActivationToId,
    });

    await this.eventBus.publish(channel.pullDomainEvents());

    const userActivation = await this.finderUserActivationService.run(
      new UserActivationId(event.userActivationToId),
    );
    console.log('ACCEPTED CHANNELS: userActivationTo');
    await this.updateActiveChatSender.run({
      userActivationId: new UserActivationId(event.userActivationFromId),
    });
    console.log('ACCEPTED CHANNELS: userActivationFrom');

    await this.updateActiveChatSender.run({
      userActivationId: new UserActivationId(event.userActivationToId),
    });

    if (
      userActivation.userId.equals(
        new UserId('0d98b73f-c720-440f-80d7-8abe98325694'),
      ) ||
      userActivation.userId.equals(
        new UserId('108df859-3c80-428a-a9bf-91d9f0cba7ef'),
      ) ||
      userActivation.userId.equals(
        new UserId('54a0e873-a309-4de9-b6bc-5d966f7f73b6'),
      ) ||
      userActivation.userId.equals(
        new UserId('bf202c4a-7c38-4704-980b-2a3b8ce1044b'),
      ) ||
      userActivation.userId.equals(
        new UserId('00148b83-d172-4260-8fd9-21968ffc2d31'),
      ) ||
      userActivation.userId.equals(
        new UserId('9ff7bf62-f69a-449f-a54c-4c7eed208bcd'),
      )
    )
      await this.creatorMessageService.run(
        {
          id: Uuid.random().value,
          text: 'Hello',
          url: '',
          channel: channel.id.value,
          userFromId: event.userActivationToId, // UserActivationId
          userToId: event.userActivationFromId, // UserConnect
          response: null,
        },
        MessageTypeEnum.TEXT,
      );
  }
}
