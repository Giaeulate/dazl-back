import { Socket } from 'socket.io';
import { GetterLastUserActiveStillService } from '../getter-last-still-active/getter-last-user-active-still.service';
import { UserActivationUpdaterService } from '../updater/user-activation-updater.service';
import { FinderUserActivationSocketIdService } from '../finder-socket-id/finder-user-activation-socket-id.service';
import { CreatorUserActiveHistoryService } from '../../../user-active-history/application/creator/creator-user-active-history.service';
import { UserVerifierService } from '../../../../Shared/application/user-verifier.service';
export declare class ManagerUserStateService {
    private readonly userVerifierService;
    private readonly getterLastUserActiveStillService;
    private readonly userActivationUpdaterService;
    private readonly finderUserActivationSocketIdService;
    private readonly creatorUserActiveHistoryService;
    constructor(userVerifierService: UserVerifierService, getterLastUserActiveStillService: GetterLastUserActiveStillService, userActivationUpdaterService: UserActivationUpdaterService, finderUserActivationSocketIdService: FinderUserActivationSocketIdService, creatorUserActiveHistoryService: CreatorUserActiveHistoryService);
    activeUser({ client }: {
        client: Socket;
    }): Promise<void>;
    deactivateUser({ client }: {
        client: Socket;
    }): Promise<void>;
}
