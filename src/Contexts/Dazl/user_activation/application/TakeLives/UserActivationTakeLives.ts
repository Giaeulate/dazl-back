import { Inject, Injectable } from '@nestjs/common';
import { UserActivationId } from '../../domain/UserActivationId';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationFinder } from '../finder/UserActivationFinder';

type Params = {
  userActivationId: UserActivationId;
};

@Injectable()
export class UserActivationTakeLives {
  private readonly finder: UserActivationFinder;

  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly repository: UserActivationRepository,
  ) {
    this.finder = new UserActivationFinder(repository);
  }

  async run(params: Params) {
    const { userActivationId } = params;
    const userActivation = await this.finder.run(userActivationId);
    userActivation.takeLives();
    await this.repository.save(userActivation);
  }
}
