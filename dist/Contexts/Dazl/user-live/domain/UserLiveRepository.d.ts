import { UserLive } from './UserLive';
import { Nullable } from '../../../Shared/domain/Nullable';
import { UserLiveId } from './UserLiveId';
export interface UserLiveRepository {
    save(userLive: UserLive): Promise<void>;
    search(id: UserLiveId): Promise<Nullable<UserLive>>;
    searchAll(): Promise<Array<UserLive>>;
    searchAllNotActive(): Promise<Array<UserLive>>;
}
