import { MessageCreatedDomainEvent } from '../../domain/MessageCreatedDomainEvent';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUnreadMessageService } from '../getter-unread/getter-unread-message.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { FinderByMessageService } from '../../../message-file/application/finder-by-message/finder-by-message.service';
import { ConvertMessageResponse } from '../ConvertResponse/ConvertMessageResponse';
export declare class SendReadMessageOnMessageCreatedService {
    private readonly moduleGateway;
    private readonly getterUnreadMessageService;
    private readonly finderUserActivationService;
    private readonly finderByMessageService;
    private readonly convertMessageResponse;
    constructor(moduleGateway: ModuleGateway, getterUnreadMessageService: GetterUnreadMessageService, finderUserActivationService: UserActivationFinder, finderByMessageService: FinderByMessageService, convertMessageResponse: ConvertMessageResponse);
    on(event: MessageCreatedDomainEvent): Promise<void>;
}
