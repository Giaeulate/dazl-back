import { Injectable } from '@nestjs/common';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { UserActivationId } from '../../domain/UserActivationId';
import {
  InvitationStatus,
  InvitationStatusEnum,
} from '../../../invitation/domain/InvitationStatus';
import { UserActivationDto } from '../../domain/dto/UserActivationDto';
import { UsersActiveFileUserDto } from '../../domain/dto/indexDto';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivationFinder } from '../finder/UserActivationFinder';

@Injectable()
export class GetterInvitationStatusService {
  constructor(
    private readonly finderAllInvitationService: FinderAllInvitationService,
    private readonly finderUserActivationService: UserActivationFinder,
    private readonly userFinderService: UserFinderService,
    private readonly fileFinderService: FileFinderService,
  ) {}

  async run(userActivationId: UserActivationId, status: InvitationStatusEnum) {
    const userActivation = await this.finderUserActivationService.run(
      userActivationId,
    );
    if (!userActivation.userIsDeleted.isAvailable()) return [];
    const invitations = await this.finderAllInvitationService.run();
    const invitationsAccepted = invitations.filter(
      (invitation) =>
        invitation.status.equals(new InvitationStatus(status)) &&
        invitation.userActivationToId.equals(userActivationId),
    );

    const invitationWithUserAvailablePromiseMapPromise =
      invitationsAccepted.map(async (invitation) => {
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
            userActivationFrom.userIsDeleted.isAvailable(),
        )
        .map(({ invitation }) => invitation);

    return await Promise.all(
      invitationWithUserAvailablePromise
        .flatMap((invitation) => invitation.userActivationToId)
        .map(
          async (userActivationId) =>
            await this.finderUserActivationService.run(userActivationId),
        )
        .map(
          async (userActivationPromise) =>
            await this.setUseFile(userActivationPromise),
        ),
    );
  }
  private async setUseFile(userActivationPromise) {
    const userActivation = await userActivationPromise;
    const userActivationDto = UserActivationDto.create(userActivation);
    return new UsersActiveFileUserDto(
      userActivationDto,
      await this.fileFinderService.invoke(userActivation.fileImageId),
      await this.userFinderService.invoke(userActivation.userId),
    );
  }
}
