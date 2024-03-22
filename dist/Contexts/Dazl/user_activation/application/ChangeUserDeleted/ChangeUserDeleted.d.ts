import { UserId } from '../../../users/domain/UserId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
export declare class ChangeUserDeleted {
    private readonly userActivationRepository;
    private readonly finderUserActivationByUserActiveService;
    constructor(userActivationRepository: UserActivationRepository);
    run(idUser: UserId): Promise<void>;
}
