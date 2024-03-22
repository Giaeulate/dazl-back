import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserActivationRequestDto } from '../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto';
import { FinderActiveUsersWsService } from '../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service';
import { UserActivationCreatorOrActivatorService } from '../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { ManagerUserStateService } from '../../../../Contexts/Dazl/user_activation/application/manager/manager-user-state.service';
import { UserVerifierService } from '../../../../Contexts/Shared/application/user-verifier.service';
import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { UserLiveAllByUserSearcher } from '../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveByUserCreator } from '../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator';
export interface CustomSocket extends Socket {
    userID: string;
    token: string;
}
export declare class UserActivationWsGateway implements OnGatewayDisconnect, OnGatewayConnection, OnGatewayInit {
    private readonly userVerifierService;
    private readonly finderActiveUserWsService;
    private readonly userActivationCreatorOrActivatorService;
    private readonly managerUserStateService;
    private readonly updaterUserService;
    private readonly getterUserActivationStatusService;
    private readonly activationFinder;
    private readonly liveAllByUserSearcher;
    private readonly liveByUserCreator;
    wss: Server;
    constructor(userVerifierService: UserVerifierService, finderActiveUserWsService: FinderActiveUsersWsService, userActivationCreatorOrActivatorService: UserActivationCreatorOrActivatorService, managerUserStateService: ManagerUserStateService, updaterUserService: UpdaterUserService, getterUserActivationStatusService: GetterUserActivationStatusService, activationFinder: UserActivationFinder, liveAllByUserSearcher: UserLiveAllByUserSearcher, liveByUserCreator: UserLiveByUserCreator);
    afterInit(): void;
    activeUser(client: CustomSocket, activationRequestDto: UserActivationRequestDto): Promise<void>;
    private disconnect;
    handleDisconnect(client: CustomSocket): Promise<void>;
    handleConnection(client: CustomSocket): Promise<void>;
}
