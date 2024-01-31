import { BadRequestException, Injectable } from '@nestjs/common';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import { UserActivationId } from '../../domain/UserActivationId';
import {
  InvitationStatus,
  InvitationStatusEnum,
} from '../../../invitation/domain/InvitationStatus';
import { UserActivationFinder } from '../finder/UserActivationFinder';

@Injectable()
export class GetterRemainingLivesService {
  constructor(
    private readonly finderAllInvitationService: FinderAllInvitationService,
    private readonly finderUserActivationService: UserActivationFinder,
  ) {}

  async run(userActivationId: UserActivationId): Promise<number> {
    const userActivation = await this.finderUserActivationService.run(
      userActivationId,
    );

    const { currentLives } = userActivation;

    // if (currentLives.value === 0)
    //   throw new BadRequestException('No tienes vidas');

    const invitations = await this.finderAllInvitationService.run();

    const invitationsThatIInvite = invitations.filter((invitation) =>
      invitation.userActivationFromId.equals(userActivationId),
    );

    console.log('invitationsThatIInvite', invitationsThatIInvite.length);

    const invitationsForMe = invitations.filter((invitation) =>
      invitation.userActivationToId.equals(userActivationId),
    );

    console.log('invitationsForMe', invitationsForMe.length);
    const invitationsThatIInvitedAndIRejected = invitationsThatIInvite.filter(
      (invitation) =>
        invitation.status.equals(
          new InvitationStatus(InvitationStatusEnum.REJECTED),
        ),
    );

    console.log(
      'invitationsThatIInvitedAndIRejected',
      invitationsThatIInvitedAndIRejected.length,
    );

    const invitationsThatIAccepted = invitationsForMe.filter((invitation) =>
      invitation.status.equals(
        new InvitationStatus(InvitationStatusEnum.ACCEPTED),
      ),
    );

    console.log('invitationsThatIAccepted', invitationsThatIAccepted.length);
    const invitationsIInvitedAndTheyRejectedMe = invitationsThatIInvite.filter(
      (invitation) =>
        invitation.status.equals(
          new InvitationStatus(InvitationStatusEnum.REJECTED),
        ),
    );
    let newCurrentLives =
      3 -
      invitationsThatIInvite.length -
      invitationsThatIAccepted.length +
      invitationsIInvitedAndTheyRejectedMe.length +
      invitationsThatIInvitedAndIRejected.length;

    console.log('invitationsThatIInvite', newCurrentLives);
    return newCurrentLives;
  }
}
