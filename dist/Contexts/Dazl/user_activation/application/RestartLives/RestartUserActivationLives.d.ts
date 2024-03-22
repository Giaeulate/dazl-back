import { UserActivationRepository } from '../../domain/UserActivationRepository';
export declare class RestartUserActivationLives {
    private readonly repository;
    constructor(repository: UserActivationRepository);
    run(): Promise<void>;
}
