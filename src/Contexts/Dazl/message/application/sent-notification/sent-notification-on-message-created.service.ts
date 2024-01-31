import { Injectable } from '@nestjs/common';
import { MessageCreatedDomainEvent } from '../../domain/MessageCreatedDomainEvent';
import { OnEvent } from '@nestjs/event-emitter';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { NotificationsService } from '../../../notification/application/push-notification/push-notification.service';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { MessageTypeEnum } from '../../domain/MessageType';

@Injectable()
export class SentNotificationOnMessageCreatedService {
  constructor(
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly userFinderService: UserFinderService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @OnEvent(MessageCreatedDomainEvent.name)
  async on(event: MessageCreatedDomainEvent) {
    const userActivationTo = await this.finderUserActivationService.run(
      new UserActivationId(event.userToId),
    );
    const userActivationFrom = await this.finderUserActivationService.run(
      new UserActivationId(event.userFromId),
    );
    if (
      userActivationTo.userIsDeleted.isAvailable() &&
      userActivationFrom.userIsDeleted.isAvailable()
    ) {
      const userTo = await this.userFinderService.invoke(
        userActivationTo.userId,
      );
      await this.notificationsService.sendPushNotification(
        userTo.id,
        userTo.tokenFirebase.value,
        {
          notification: {
            title: userActivationFrom.name.value,
            body: event.type === MessageTypeEnum.IMAGE ? 'Foto' : event.text,
          },
          data: {
            user_activation_id: userActivationFrom.id.value,
          },
        },
      );
    }
  }
}
