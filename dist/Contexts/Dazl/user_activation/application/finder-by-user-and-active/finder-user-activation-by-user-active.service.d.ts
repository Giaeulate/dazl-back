import { UserActivation } from '../../domain/UserActivation';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserId } from '../../../users/domain/UserId';
export declare class FinderUserActivationByUserActiveService {
    private readonly userActivationRepository;
    constructor(userActivationRepository: UserActivationRepository);
    run(userId: UserId): Promise<UserActivation>;
}
