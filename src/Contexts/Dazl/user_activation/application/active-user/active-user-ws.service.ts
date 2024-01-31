import { Inject, Injectable } from '@nestjs/common';
import { CreatorUserActivationService } from '../creator/creator-user-activation.service';
import { UserActivationRequestDto } from '../dto/UserActivationRequestDto';
import { USER_ACTIVATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { UserId } from '../../../users/domain/UserId';
import { UserActivation } from '../../domain/UserActivation';

@Injectable()
export class ActiveUserWsService {
  constructor(
    @Inject(USER_ACTIVATION_REPOSITORY)
    private readonly userActivationRepository: UserActivationRepository,
    private readonly creatorUserActivationService: CreatorUserActivationService,
  ) {}

  async registerClient(
    idUser: string,
    activationRequestDto: UserActivationRequestDto,
    socketId: string,
    token: string,
  ): Promise<UserActivation> {
    const userActivationCreated = await this.creatorUserActivationService.run(
      activationRequestDto,
      idUser,
      socketId,
      token,
    );

    const usersActivationByUser =
      await this.userActivationRepository.searchAllByUserId(new UserId(idUser));
    const usersActivationChanged = usersActivationByUser
      .filter(
        (userActivation) => !userActivation.id.equals(userActivationCreated.id),
      )
      .map((userActivation) => {
        userActivation.deactivate();
        return userActivation;
      });
    await this.userActivationRepository.saveAll(usersActivationChanged);

    return userActivationCreated;
  }
}
