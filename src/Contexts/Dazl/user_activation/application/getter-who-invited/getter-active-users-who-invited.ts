import { Injectable } from '@nestjs/common';
import { UserActivationId } from '../../domain/UserActivationId';
import {
  InvitationStatus,
  InvitationStatusEnum,
} from '../../../invitation/domain/InvitationStatus';
import { UserActivationDto } from '../../domain/dto/UserActivationDto';
import { UsersActiveUserDto } from '../../domain/dto/indexDto';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserActivation } from '../../domain/UserActivation';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserGenderEnum } from '../../../users/domain/UserGender';
import { UserActivationFinder } from '../finder/UserActivationFinder';

@Injectable()
export class GetterActiveUsersWhoInvited {
  constructor(
    private readonly finderAllInvitationService: FinderAllInvitationService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly userFinderService: UserFinderService,
  ) {}

  async run(
    userActivationId: UserActivationId,
    genderEnum: UserGenderEnum,
  ): Promise<UsersActiveUserDto[]> {
    const userActivation = await this.finderUserActivationService.run(
      userActivationId,
    );
    if (!userActivation.userIsDeleted.isAvailable()) return [];
    const invitations = await this.finderAllInvitationService.run();
    const invitationsPending = invitations.filter(
      (invitation) =>
        invitation.userActivationToId.equals(userActivationId) &&
        invitation.status.equals(
          new InvitationStatus(InvitationStatusEnum.PENDING),
        ),
    );
    const invitationWithUserAvailablePromise = invitationsPending.filter(
      async ({ userActivationFromId, userActivationToId }) => {
        const userActivationFrom = await this.finderUserActivationService.run(
          userActivationFromId,
        );
        const userActivationTo = await this.finderUserActivationService.run(
          userActivationToId,
        );
        return (
          userActivationFrom.userIsDeleted.isAvailable() &&
          userActivationTo.userIsDeleted.isAvailable()
        );
      },
    );

    return await Promise.all(
      invitationWithUserAvailablePromise
        .flatMap((invitation) => invitation.userActivationToId)
        .map(
          async (userActivationId) =>
            await this.finderUserActivationService.run(userActivationId),
        )
        .map(async (userActivationPromise) => {
          const userActivation = await userActivationPromise;
          return this.setUser(userActivation);
        })
        .filter(async (userPromise) => {
          const user = await userPromise;
          if (!genderEnum) return true;
          return user.user.gender == genderEnum;
        }),
    );
  }

  private async setUser(userActivation: UserActivation) {
    const userActivationDto = UserActivationDto.create(userActivation);
    return new UsersActiveUserDto(
      userActivationDto,
      await this.userFinderService.invoke(userActivation.userId),
    );
  }
}
