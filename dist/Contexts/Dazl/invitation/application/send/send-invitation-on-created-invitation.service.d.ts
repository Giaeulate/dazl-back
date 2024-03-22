import { InvitationCreatedDomainEvent } from '../../domain/InvitationCreatedDomainEvent';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';
export declare class SendInvitationOnCreatedInvitationService {
    private readonly finderUserActivationService;
    private readonly moduleGateway;
    private readonly getterUserActivationStatusService;
    constructor(finderUserActivationService: UserActivationFinder, moduleGateway: ModuleGateway, getterUserActivationStatusService: GetterUserActivationStatusService);
    on(event: InvitationCreatedDomainEvent): Promise<void>;
}
