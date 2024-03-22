import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { UserLiveActive } from '../../../user-live/application/active/UserLiveActive';
import { UserLiveDesactive } from '../../../user-live/application/desactive/UserLiveDesactive';
export declare class SetterCurrentLivesUserActivationService {
    private readonly finderUserActivationService;
    private readonly active;
    private readonly desactive;
    private readonly userActivationRepository;
    constructor(finderUserActivationService: UserActivationFinder, active: UserLiveActive, desactive: UserLiveDesactive, userActivationRepository: UserActivationRepository);
    add: (userActivationId: UserActivationId) => Promise<void>;
    subtract: (userActivationId: UserActivationId) => Promise<void>;
    private ensureCurrentLivesIsGreaterThanZero;
}
