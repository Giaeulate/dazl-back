import { Inject, Injectable } from '@nestjs/common';
import { UserId } from '../../../users/domain/UserId';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivation } from '../../domain/UserActivation';

@Injectable()
export class GetterLastUserActiveStillService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}
  async run(idUser: UserId): Promise<UserActivation | null> {
    const userActivations =
      await this.userActivationRepository.searchAllByUserId(idUser);

    const usersActive = userActivations.filter((userActivation) =>
      userActivation.isStillActive(),
    );
    if (usersActive.length == 0) return null;
    return this.getTheUserActivationWithTheLatestStartTime(usersActive);
  }

  private getTheUserActivationWithTheLatestStartTime = (
    usersActive: Array<UserActivation>,
  ): UserActivation =>
    usersActive.reduce((previous, current) => {
      const now = new Date().getTime();
      const previousStartTime = Number(previous.expirationDate);
      const currentStartTime = Number(current.expirationDate);
      const diffPrevious = previousStartTime - now;
      const diffCurrent = currentStartTime - now;
      if (diffPrevious < diffCurrent) return previous;
      return current;
    }, usersActive[0] as UserActivation);
}
