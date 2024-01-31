import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationCurrentLives } from '../../domain/UserActivationCurrentLives';
import { UserActivation } from '../../domain/UserActivation';
import { UserActivationFinder } from '../finder/UserActivationFinder';
import { UserLiveActive } from '../../../user-live/application/active/UserLiveActive';
import { UserLiveDesactive } from '../../../user-live/application/desactive/UserLiveDesactive';

@Injectable()
export class SetterCurrentLivesUserActivationService {
  constructor(
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly active: UserLiveActive,
    private readonly desactive: UserLiveDesactive,
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}

  add = async (userActivationId: UserActivationId): Promise<void> => {
    const userActivation = await this.finderUserActivationService.run(
      userActivationId,
    );
    userActivation.currentLives = new UserActivationCurrentLives(
      userActivation.currentLives.value + 1,
    );
    await this.userActivationRepository.save(userActivation);
    await this.active.run({ userId: userActivation.userId.value });
  };

  subtract = async (userActivationId: UserActivationId): Promise<void> => {
    const userActivation = await this.finderUserActivationService.run(
      userActivationId,
    );
    // this.ensureCurrentLivesIsGreaterThanZero(userActivation);
    userActivation.currentLives = new UserActivationCurrentLives(
      userActivation.currentLives.value - 1,
    );
    await this.userActivationRepository.save(userActivation);
    await this.desactive.run({ userId: userActivation.userId.value });
  };

  private ensureCurrentLivesIsGreaterThanZero = (
    userActivation: UserActivation,
  ) => {
    if (userActivation.currentLives.value <= 0) {
      throw new BadRequestException('Se te acabaron las vidas');
    }
  };
}
