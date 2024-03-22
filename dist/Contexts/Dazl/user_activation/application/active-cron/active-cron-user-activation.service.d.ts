import { SchedulerRegistry } from '@nestjs/schedule';
import { UserActivationCreatedDomainEvent } from '../../domain/UserActivationCreatedDomainEvent';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { DesactiveUserActivation } from '../deactivate/DesactiveUserActivation';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUserActivationStatusService } from '../getter-current-status/getter-user-activation-status.service';
export declare class ActiveCronUserActivationService {
    private readonly schedulerRegistry;
    private readonly finderUserActivationService;
    private readonly desactiveUserActivation;
    private readonly finderAllInvitationService;
    private readonly getterUserActivationStatusService;
    private readonly userActivationRepository;
    private readonly moduleGateway;
    constructor(schedulerRegistry: SchedulerRegistry, finderUserActivationService: UserActivationFinder, desactiveUserActivation: DesactiveUserActivation, finderAllInvitationService: FinderAllInvitationService, getterUserActivationStatusService: GetterUserActivationStatusService, userActivationRepository: UserActivationRepository, moduleGateway: ModuleGateway);
    on({ aggregateId: userActivationId, }: UserActivationCreatedDomainEvent): Promise<void>;
    private callback;
}
