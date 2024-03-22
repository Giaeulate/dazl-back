import { UserActivation } from './UserActivation';
import { UserActivationId } from './UserActivationId';
import { Nullable } from '../../../Shared/domain/Nullable';
import { UserId } from '../../users/domain/UserId';
import { UserActivationSocketId } from './UserActivationSocketId';
export interface UserActivationRepository {
    save(userActivation: UserActivation): Promise<void>;
    saveAll(userActivations: Array<UserActivation>): Promise<void>;
    search(id: UserActivationId): Promise<Nullable<UserActivation>>;
    searchBySocketId(id: UserActivationSocketId): Promise<Nullable<UserActivation>>;
    searchByUserIdAndActive(id: UserId): Promise<Nullable<UserActivation>>;
    searchAllActive(): Promise<Array<UserActivation>>;
    searchAll(): Promise<Nullable<Array<UserActivation>>>;
    searchAllByUserId(userId: UserId): Promise<Array<UserActivation>>;
}
