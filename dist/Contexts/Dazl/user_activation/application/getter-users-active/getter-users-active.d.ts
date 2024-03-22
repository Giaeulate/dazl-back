import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { UserId } from '../../../users/domain/UserId';
import { UsersActiveUserDto } from '../../domain/dto/indexDto';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserGenderEnum } from '../../../users/domain/UserGender';
export declare class GetterUsersActive {
    private readonly userActivationRepository;
    private readonly geometricCalculatorService;
    private readonly userFinderService;
    private readonly finderAllInvitationService;
    constructor(userActivationRepository: UserActivationRepository, geometricCalculatorService: GeometricCalculatorService, userFinderService: UserFinderService, finderAllInvitationService: FinderAllInvitationService);
    run(userId: UserId, genderEnum: UserGenderEnum, whatToLookingFor: {
        male: IsBoolean;
        female: IsBoolean;
        lgtb: IsBoolean;
    }): Promise<Array<UsersActiveUserDto>>;
    private setUser;
}
