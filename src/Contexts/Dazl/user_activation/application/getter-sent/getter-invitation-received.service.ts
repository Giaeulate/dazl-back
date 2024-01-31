import { Injectable } from '@nestjs/common';
import { UserActivationId } from '../../domain/UserActivationId';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { UserActivationDto } from '../../domain/dto/UserActivationDto';
import { UsersActiveFileUserDto } from '../../domain/dto/indexDto';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
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
  ): Promise<UsersActiveFileUserDto[]> {
    const invitations = await this.finderAllInvitationService.run();
    const invitationsReceived = invitations.filter((invitation) => {
      invitation.userActivationToId.equals(userActivationId);
    });
    const invitationWithUserAvailablePromise = invitationsReceived.some(
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
    if (!invitationWithUserAvailablePromise) return [];

    return await Promise.all(
      invitationsReceived
        .flatMap((invitation) => invitation.userActivationFromId)
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
