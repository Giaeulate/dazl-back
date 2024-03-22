import { InvitationRepository } from '../../domain/InvitationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { SetterCurrentLivesUserActivationService } from '../../../user_activation/application/setter-current-lives/setter-current-lives-user-activation.service';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChangeStatusInvitationService } from '../chance-status/change-status-invitation.service';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { GetterRemainingLivesService } from '../../../user_activation/application/getter-remaining-lives/getter-remaining-lives.service';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';
export declare class CreatorInvitationService {
    private readonly invitationRepository;
    private readonly eventBus;
    private readonly finderUserActivationService;
    private readonly setterCurrentLivesUserActivationService;
    private readonly sendNotificationService;
    private readonly userFinderService;
    private readonly changeStatusInvitationService;
    private readonly remainingLivesService;
    private readonly getterUserActivationStatusService;
    private readonly moduleGateway;
    constructor(invitationRepository: InvitationRepository, eventBus: EventBus, finderUserActivationService: UserActivationFinder, setterCurrentLivesUserActivationService: SetterCurrentLivesUserActivationService, sendNotificationService: SendNotificationService, userFinderService: UserFinderService, changeStatusInvitationService: ChangeStatusInvitationService, remainingLivesService: GetterRemainingLivesService, getterUserActivationStatusService: GetterUserActivationStatusService, moduleGateway: ModuleGateway);
    run: (userTo: string, userFrom: string) => Promise<void>;
    private ensureTheInvitationIsNotCreated;
    private ensureThatUserToIsInsideTheRangeOfUserFrom;
}
