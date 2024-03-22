import { Server } from 'socket.io';
import { UserVerifierService } from '../../../../Contexts/Shared/application/user-verifier.service';
import { UpdaterUserActivationLatLng } from '../../../../Contexts/Dazl/user_activation/application/UpdateLatLng/UpdaterUserActivationLatLng';
import { GetterLastUserActiveStillService } from '../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { CustomSocket } from './user-activation-ws.gateway';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
type Payload = {
    lat: string | null;
    lng: string | null;
};
export declare class UpdaterUserActivationLatLngGateway {
    private readonly userVerifierService;
    private readonly updaterUserActivationLatLng;
    private readonly getterLastUserActiveStillService;
    private readonly getterUserActivationStatusService;
    private readonly activationFinder;
    wss: Server;
    constructor(userVerifierService: UserVerifierService, updaterUserActivationLatLng: UpdaterUserActivationLatLng, getterLastUserActiveStillService: GetterLastUserActiveStillService, getterUserActivationStatusService: GetterUserActivationStatusService, activationFinder: UserActivationFinder);
    activeUser(client: CustomSocket, payload: Payload): Promise<void>;
}
export {};
