import { Injectable } from '@nestjs/common';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserActivationDto } from '../../domain/dto/UserActivationDto';
import { UsersActiveFileUserInvitationDto } from '../../domain/dto/indexDto';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivation } from '../../domain/UserActivation';
import {
  InvitationStatus,
  InvitationStatusEnum,
} from '../../../invitation/domain/InvitationStatus';
import { UserActivationFinder } from '../finder/UserActivationFinder';

@Injectable()
export class GetterInvitationReceivedService {
  constructor(
    private readonly finderAllInvitationService: FinderAllInvitationService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
  ) {}

  async run(
    userActivationId: UserActivationId,
  ): Promise<UsersActiveFileUserInvitationDto[]> {
    const userActivation = await this.finderUserActivationService.run(
      userActivationId,
    );
    if (!userActivation.userIsDeleted.isAvailable()) return [];
    const invitations = await this.finderAllInvitationService.run();
    const invitationsReceived = invitations.filter(
      (invitation) =>
        invitation.userActivationToId.equals(userActivationId) &&
        invitation.status.equals(
          new InvitationStatus(InvitationStatusEnum.PENDING),
        ),
    );
    const invitationWithUserAvailablePromiseMapPromise =
      invitationsReceived.map(async (invitation) => {
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
      });

    const invitationWithUserAvailablePromiseMap = await Promise.all(
      invitationWithUserAvailablePromiseMapPromise,
    );

    const invitationWithUserAvailablePromise =
      invitationWithUserAvailablePromiseMap
        .filter(
          ({ userActivationFrom, userActivationTo }) =>
            userActivationTo.userIsDeleted.isAvailable() &&
            userActivationFrom.userIsDeleted.isAvailable() &&
            userActivationFrom.isStillActive(),
        )
        .filter(({ userActivationTo }) => userActivationTo.isStillActive())
        .map(({ invitation }) => invitation);

    return await Promise.all(
      invitationWithUserAvailablePromise.map(async (invitation) => {
        const userActivation = await this.finderUserActivationService.run(
          invitation.userActivationFromId,
        );
        return await this.setUseFile(userActivation, invitation.id.value);
      }),
    );
  }

  private async setUseFile(
    userActivation: UserActivation,
    invitation?: string,
  ): Promise<UsersActiveFileUserInvitationDto> {
    const userActivationDto = UserActivationDto.create(userActivation);
    const user = await this.userFinderService.invoke(userActivation.userId);
    if (!user) return;
    return new UsersActiveFileUserInvitationDto(
      userActivationDto,
      await this.fileFinderService.invoke(userActivation.fileImageId),
      user,
      invitation,
    );
  }
}
