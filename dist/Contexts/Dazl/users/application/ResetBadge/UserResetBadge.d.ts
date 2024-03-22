import { UserRepository } from '../../domain/UserRepository';
import { UserTokenFirebase } from '../../domain/UserTokenFirebase';
export declare class UserResetBadge {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    run(token: UserTokenFirebase): Promise<void>;
}
