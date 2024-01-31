import { Injectable } from '@nestjs/common';
import { UserActivation } from '../../../user_activation/domain/UserActivation';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { NotificationsService } from '../push-notification/push-notification.service';

@Injectable()
export class SendNotificationService {
  constructor(
    private readonly userFinderService: UserFinderService,
    private readonly notificationsService: NotificationsService,
  ) {}

  sendNotification = async (
    userActivationTo: UserActivation,
    notification: {
      title: string;
      body: string;
    },
    data: { [key: string]: string },
  ): Promise<void> => {
    const user = await this.userFinderService.invoke(userActivationTo.userId);
    if (user) {
      await this.notificationsService.sendNotificationReal(
        userActivationTo,
        user,
        {
          notification,
          data,
        },
      );
    }
  };
}
