import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivation } from '../../domain/UserActivation';
export declare class UserActivationFinder {
    private readonly repository;
    constructor(repository: UserActivationRepository);
    run(userActivationId: UserActivationId): Promise<UserActivation>;
    private ensureUserActivationExists;
}
