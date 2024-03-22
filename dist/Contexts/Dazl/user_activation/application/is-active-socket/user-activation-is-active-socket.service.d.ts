import { FinderUserActivationSocketIdService } from '../finder-socket-id/finder-user-activation-socket-id.service';
import { UserActivationSocketId } from '../../domain/UserActivationSocketId';
import { UserActivationIsActiveSocket } from '../../domain/UserActivationIsActiveSocket';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
export declare class UserActivationIsActiveSocketService {
    private readonly userActivationRepository;
    private readonly finderUserActivationSocketIdService;
    constructor(userActivationRepository: UserActivationRepository, finderUserActivationSocketIdService: FinderUserActivationSocketIdService);
    run: ({ userActivationSocketId, isActiveSocket, }: {
        userActivationSocketId: UserActivationSocketId;
        isActiveSocket: UserActivationIsActiveSocket;
    }) => Promise<void>;
}
