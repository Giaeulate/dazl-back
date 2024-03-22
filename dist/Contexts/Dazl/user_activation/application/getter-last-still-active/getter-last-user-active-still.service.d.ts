import { UserId } from '../../../users/domain/UserId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivation } from '../../domain/UserActivation';
export declare class GetterLastUserActiveStillService {
    private readonly userActivationRepository;
    constructor(userActivationRepository: UserActivationRepository);
    run(idUser: UserId): Promise<UserActivation | null>;
    private getTheUserActivationWithTheLatestStartTime;
}
