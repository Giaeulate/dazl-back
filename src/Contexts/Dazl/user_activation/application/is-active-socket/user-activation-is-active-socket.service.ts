import { Inject, Injectable } from '@nestjs/common';
import { FinderUserActivationSocketIdService } from '../finder-socket-id/finder-user-activation-socket-id.service';
import { UserActivationSocketId } from '../../domain/UserActivationSocketId';
import { UserActivationIsActiveSocket } from '../../domain/UserActivationIsActiveSocket';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';

@Injectable()
export class UserActivationIsActiveSocketService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    private readonly finderUserActivationSocketIdService: FinderUserActivationSocketIdService,
  ) {}

  run = async ({
    userActivationSocketId,
    isActiveSocket,
  }: {
    userActivationSocketId: UserActivationSocketId;
    isActiveSocket: UserActivationIsActiveSocket;
  }) => {
    const userActivation = await this.finderUserActivationSocketIdService.run(
      userActivationSocketId,
    );
    userActivation.isActiveSocket = isActiveSocket;
    await this.userActivationRepository.save(userActivation);
  };
}
