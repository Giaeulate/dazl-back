import { User } from '../../../Dazl/users/domain/User';
import { UserId } from '../../../Dazl/users/domain/UserId';
export declare class UserFinderService {
    private readonly userRepository;
    invoke(id: UserId): Promise<User>;
    private ensureUserExists;
}
