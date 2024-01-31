import { Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserActivation } from '../../domain/UserActivation';
import { User } from '../../../users/domain/User';
import { UserGender } from '../../../users/domain/UserGender';
import { UserActivationActive } from '../../domain/UserActivationActive';
import { IsBoolean } from '../../../Shared/IsBoolean';

@Injectable()
export class GetterByGenderUserActivationService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    private readonly userFinderService: UserFinderService,
  ) {}

  async run(
    gender: UserGender | null,
  ): Promise<Array<{ userActivation: UserActivation; user: User }>> {
    const userActivations = await this.userActivationRepository.searchAll();
    const userActivationsAvailablePromise = userActivations.filter(
      async (userActivation) => userActivation.userIsDeleted.isAvailable(),
    );

    const userActivationsAvailable = await Promise.all(
      userActivationsAvailablePromise,
    );

    const usersPromise = userActivationsAvailable.map(
      async (userActivation) => {
        const user = await this.userFinderService.invoke(userActivation.userId);
        return {
          userActivation,
          user,
        };
      },
    );

    const users = await Promise.all(usersPromise);

    const usersActive = users.filter(({ userActivation }) =>
      userActivation.active.equals(new UserActivationActive(IsBoolean.TRUE)),
    );

    if (!gender) return usersActive;

    return usersActive.filter((user) => user.user.gender.equals(gender));
  }
}
