import { UserActivationDeactivatedDomainEvent } from '../../domain/UserActivationDeactivatedDomainEvent';
import { FinderUserPhotosAll } from '../../../user-photos/application/FinderAll/FinderUserPhotosAll';
import { DeleteUserPhoto } from '../../../user-photos/application/DeletePhoto/DeleteUserPhoto';
import { FinderUser } from '../../../users/application/Finder/FinderUser';
export declare class DeleteUserPhotosOnDeactivatedUserActivation {
    private readonly finderUser;
    private readonly finderUserPhotosAll;
    private readonly deleteUserPhoto;
    constructor(finderUser: FinderUser, finderUserPhotosAll: FinderUserPhotosAll, deleteUserPhoto: DeleteUserPhoto);
    on(event: UserActivationDeactivatedDomainEvent): Promise<void>;
}
