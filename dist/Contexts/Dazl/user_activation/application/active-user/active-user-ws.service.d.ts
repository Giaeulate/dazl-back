import { CreatorUserActivationService } from '../creator/creator-user-activation.service';
import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivation } from '../../domain/UserActivation';
export declare class ActiveUserWsService {
    private readonly userActivationRepository;
    private readonly creatorUserActivationService;
    constructor(userActivationRepository: UserActivationRepository, creatorUserActivationService: CreatorUserActivationService);
    registerClient(idUser: string, activationRequestDto: UserActivationRequestDto, socketId: string, token: string): Promise<UserActivation>;
}
