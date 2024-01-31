import { UserActivation } from '../../domain/UserActivation';
import { Inject, Injectable } from '@nestjs/common';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserId } from '../../../users/domain/UserId';

@Injectable()
export class FinderUserActivationByUserActiveService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}

  async run(userId: UserId): Promise<UserActivation> {
    return await this.userActivationRepository.searchByUserIdAndActive(userId);
  }
}
