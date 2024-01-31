import { Injectable } from '@nestjs/common';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivationId } from '../../domain/UserActivationId';
import {
  UsersActiveFileUserDto,
  UsersActiveFileUserInvitationDto,
} from '../../domain/dto/indexDto';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { UserActivationDto } from '../../domain/dto/UserActivationDto';
import {
  InvitationStatus,
  InvitationStatusEnum,
} from '../../../invitation/domain/InvitationStatus';
import { UserActivationFinder } from '../finder/UserActivationFinder';

@Injectable()
export class GetterInvitationSentService {
  constructor(
    private readonly finderAllInvitationService: FinderAllInvitationService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
  ) {}

  async run(
    userActivationId: UserActivationId,
  ): Promise<UsersActiveFileUserDto[]> {
    const userActivation = await this.finderUserActivationService.run(
      userActivationId,
    );
    if (!userActivation.userIsDeleted.isAvailable()) return [];
    const invitations = await this.finderAllInvitationService.run();
    const invitationsSent = invitations.filter(
      (invitation) =>
        invitation.userActivationFromId.equals(userActivationId) &&
        invitation.status.equals(
          new InvitationStatus(InvitationStatusEnum.PENDING),
        ),
    );

    const invitationWithUserAvailablePromiseMapPromise = invitationsSent.map(
      async (invitation) => {
        const userActivationFrom = await this.finderUserActivationService.run(
          invitation.userActivationFromId,
        );
        const userActivationTo = await this.finderUserActivationService.run(
          invitation.userActivationToId,
        );
        return {
          userActivationFrom,
          userActivationTo,
          invitation,
        };
      },
    );

    const invitationWithUserAvailablePromiseMap = await Promise.all(
      invitationWithUserAvailablePromiseMapPromise,
    );

    const invitationWithUserAvailablePromise =
      invitationWithUserAvailablePromiseMap
        .filter(
          ({ userActivationFrom, userActivationTo }) =>
            userActivationTo.userIsDeleted.isAvailable() &&
            userActivationTo.isStillActive() &&
            userActivationFrom.isStillActive() &&
            userActivationFrom.userIsDeleted.isAvailable(),
        )
        .map(({ invitation }) => invitation);

    const f = invitationWithUserAvailablePromise.map(async (invitation) => {
      const userActivation = await this.finderUserActivationService.run(
        invitation.userActivationToId,
      );
      return await this.setUseFile(userActivation, invitation.id.value);
    });

    return await Promise.all(f);
  }

  private async setUseFile(
    userActivationPromise,
    invitation?: string,
  ): Promise<UsersActiveFileUserInvitationDto> {
    const userActivation = await userActivationPromise;
    const userActivationDto = UserActivationDto.create(userActivation);
    return new UsersActiveFileUserInvitationDto(
      userActivationDto,
      await this.fileFinderService.invoke(userActivation.fileImageId),
      await this.userFinderService.invoke(userActivation.userId),
      invitation,
    );
  }
}
