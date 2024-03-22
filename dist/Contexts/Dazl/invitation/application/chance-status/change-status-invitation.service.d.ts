import { InvitationRepository } from '../../domain/InvitationRepository';
import { InvitationStatusEnum } from '../../domain/InvitationStatus';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { FinderInvitationService } from '../finder/finder-invitation.service';
import { SetterCurrentLivesUserActivationService } from '../../../user_activation/application/setter-current-lives/setter-current-lives-user-activation.service';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';
import { GetterChannelByUserService } from '../../../channel-user/application/getter-by-user/getter-channel-by-user.service';
export declare class ChangeStatusInvitationService {
    private readonly finderInvitationService;
    private readonly eventBus;
    private readonly invitationRepository;
    private readonly setterCurrentLivesUserActivationService;
    private readonly finderUserActivationService;
    private readonly moduleGateway;
    private readonly sendNotificationService;
    private readonly getterChannelByUserService;
    private readonly getterUserActivationStatusService;
    constructor(finderInvitationService: FinderInvitationService, eventBus: EventBus, invitationRepository: InvitationRepository, setterCurrentLivesUserActivationService: SetterCurrentLivesUserActivationService, finderUserActivationService: UserActivationFinder, moduleGateway: ModuleGateway, sendNotificationService: SendNotificationService, getterChannelByUserService: GetterChannelByUserService, getterUserActivationStatusService: GetterUserActivationStatusService);
    run: (invitationId: string, status: InvitationStatusEnum) => Promise<void>;
    private ensureInvitationHasNotBeenAcceptedOrRejected;
    private setCurrentLive;
}
