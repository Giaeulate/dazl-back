import { UserActivationSocketId } from '../../domain/UserActivationSocketId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivation } from '../../domain/UserActivation';
export declare class FinderUserActivationSocketIdService {
    private readonly userActivationRepository;
    constructor(userActivationRepository: UserActivationRepository);
    run: (id: UserActivationSocketId) => Promise<UserActivation>;
}
