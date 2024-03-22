import { UserActivationRepository } from '../../domain/UserActivationRepository';
export declare class FinderByUserService {
    private readonly userActivationRepository;
    constructor(userActivationRepository: UserActivationRepository);
    run(idUser: string): Promise<void>;
}
