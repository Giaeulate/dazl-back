import { Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';

@Injectable()
export class RestartUserActivationLives {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly repository: UserActivationRepository,
  ) {}

  async run() {
    const userActivations = await this.repository.searchAll();
    const userActivationsStillLive = userActivations.filter((userActivation) =>
      userActivation.isStillActive(),
    );

    userActivationsStillLive.forEach((userActivation) => {
      userActivation.restartLive();
      this.repository.save(userActivation);
    });
  }
}
