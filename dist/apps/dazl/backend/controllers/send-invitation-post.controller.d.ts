import { CreatorInvitationService } from '../../../../Contexts/Dazl/invitation/application/creator/creator-invitation.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
export declare class SendInvitationPostController {
    private readonly creatorInvitationService;
    private readonly userActivationFinder;
    private readonly getterUserActivationStatusService;
    constructor(creatorInvitationService: CreatorInvitationService, userActivationFinder: UserActivationFinder, getterUserActivationStatusService: GetterUserActivationStatusService);
    run(userTo: string, userFrom: string): Promise<unknown>;
}
