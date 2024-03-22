import { MessageCreatedDomainEvent } from '../../domain/MessageCreatedDomainEvent';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { NotificationsService } from '../../../notification/application/push-notification/push-notification.service';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
export declare class SentNotificationOnMessageCreatedService {
    private readonly finderUserActivationService;
    private readonly userFinderService;
    private readonly notificationsService;
    constructor(finderUserActivationService: UserActivationFinder, userFinderService: UserFinderService, notificationsService: NotificationsService);
    on(event: MessageCreatedDomainEvent): Promise<void>;
}
