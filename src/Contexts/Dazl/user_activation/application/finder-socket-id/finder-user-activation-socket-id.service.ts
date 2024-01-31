import { Inject, Injectable } from '@nestjs/common';
import { UserActivationSocketId } from '../../domain/UserActivationSocketId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivation } from '../../domain/UserActivation';

@Injectable()
export class FinderUserActivationSocketIdService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {}

  run = async (id: UserActivationSocketId): Promise<UserActivation> => {
    return await this.userActivationRepository.searchBySocketId(id);
  };
}
