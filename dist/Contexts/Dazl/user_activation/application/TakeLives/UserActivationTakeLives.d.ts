import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
type Params = {
    userActivationId: UserActivationId;
};
export declare class UserActivationTakeLives {
    private readonly repository;
    private readonly finder;
    constructor(repository: UserActivationRepository);
    run(params: Params): Promise<void>;
}
export {};
