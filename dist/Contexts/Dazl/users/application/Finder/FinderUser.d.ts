import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
export declare class FinderUser {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    run(id: UserId): Promise<User>;
    private ensureUserExist;
}
