import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivation } from '../../domain/UserActivation';

@Injectable()
export class UserActivationFinder {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly repository: UserActivationRepository,
  ) {}

  async run(userActivationId: UserActivationId): Promise<UserActivation> {
    const userActivation = await this.repository.search(userActivationId);
    this.ensureUserActivationExists(userActivation);
    return userActivation;
  }

  private ensureUserActivationExists(userActivation: UserActivation) {
    if (!userActivation)
      throw new BadRequestException(' UserActivation not found');
  }
}
