import { Inject, Injectable } from '@nestjs/common';
import { UserId } from '../../../users/domain/UserId';
import { FinderUserActivationByUserActiveService } from '../finder-by-user-and-active/finder-user-activation-by-user-active.service';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';

@Injectable()
export class ChangeUserDeleted {
  private readonly finderUserActivationByUserActiveService: FinderUserActivationByUserActiveService;
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
  ) {
    this.finderUserActivationByUserActiveService =
      new FinderUserActivationByUserActiveService(userActivationRepository);
  }

  async run(idUser: UserId) {
    const userActivation =
      await this.finderUserActivationByUserActiveService.run(idUser);
    if (userActivation) {
      userActivation.userDeleted();
      await this.userActivationRepository.save(userActivation);
    }
  }
}
