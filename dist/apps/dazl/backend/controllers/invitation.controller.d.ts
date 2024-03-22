import { ChangeStatusInvitationService } from '../../../../Contexts/Dazl/invitation/application/chance-status/change-status-invitation.service';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
declare class QueryParamsGetUserActivationIdStatus {
    user_activation_id: string;
}
export declare class InvitationController {
    private readonly acceptInvitationService;
    private readonly getterUserActivationStatusService;
    private readonly userActivationFinder;
    constructor(acceptInvitationService: ChangeStatusInvitationService, getterUserActivationStatusService: GetterUserActivationStatusService, userActivationFinder: UserActivationFinder);
    runAccepted(invitationId: string, { user_activation_id }: QueryParamsGetUserActivationIdStatus): Promise<unknown>;
    runRejected(invitationId: string, { user_activation_id }: QueryParamsGetUserActivationIdStatus): Promise<unknown>;
    runCancel(invitationId: string, { user_activation_id }: QueryParamsGetUserActivationIdStatus): Promise<unknown>;
}
export {};
