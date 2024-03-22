import { InvitationStatusAcceptedChangedDomainEvent } from '../../domain/InvitationStatusAcceptedChangedDomainEvent';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';
export declare class SendNotificationOnChangedInvitationStatus {
    private readonly moduleGateway;
    private readonly finderUserActivationService;
    private readonly getterUserActivationStatusService;
    constructor(moduleGateway: ModuleGateway, finderUserActivationService: UserActivationFinder, getterUserActivationStatusService: GetterUserActivationStatusService);
    on(event: InvitationStatusAcceptedChangedDomainEvent): Promise<void>;
}
