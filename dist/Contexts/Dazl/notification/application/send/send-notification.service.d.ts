import { UserActivation } from '../../../user_activation/domain/UserActivation';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { NotificationsService } from '../push-notification/push-notification.service';
export declare class SendNotificationService {
    private readonly userFinderService;
    private readonly notificationsService;
    constructor(userFinderService: UserFinderService, notificationsService: NotificationsService);
    sendNotification: (userActivationTo: UserActivation, notification: {
        title: string;
        body: string;
    }, data: {
        [key: string]: string;
    }) => Promise<void>;
}
