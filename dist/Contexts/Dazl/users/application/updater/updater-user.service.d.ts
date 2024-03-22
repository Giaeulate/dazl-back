import { UserId } from '../../domain/UserId';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserRepository } from '../../domain/UserRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
export declare class UpdaterUserService {
    private readonly userFinderService;
    private readonly userRepository;
    private readonly eventBus;
    constructor(userFinderService: UserFinderService, userRepository: UserRepository, eventBus: EventBus);
    run: (id: UserId, plainData: {
        name?: string;
        firstName?: string;
        lastName?: string;
        gender?: string;
        age?: number;
        email?: string;
        password?: string;
        popularity?: number;
        confirmationCode?: string;
        confirmationTime?: string;
        status?: string;
        latitude?: string;
        longitude?: string;
        tokenFirebase?: string;
        active?: boolean;
        activeDate?: string;
        expirationDate?: string;
        otherEmail?: string;
        instagramUrl?: string;
        whatsappUrl?: string;
    }) => Promise<void>;
}
