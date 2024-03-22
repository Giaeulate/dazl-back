import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserActivation } from '../../domain/UserActivation';
import { User } from '../../../users/domain/User';
import { UserGender } from '../../../users/domain/UserGender';
export declare class GetterByGenderUserActivationService {
    private readonly userActivationRepository;
    private readonly userFinderService;
    constructor(userActivationRepository: UserActivationRepository, userFinderService: UserFinderService);
    run(gender: UserGender | null): Promise<Array<{
        userActivation: UserActivation;
        user: User;
    }>>;
}
