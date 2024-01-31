import { Injectable } from '@nestjs/common';
import { FinderAllInvitationService } from '../../../invitation/application/find-all/finder-all-invitation.service';
import {
  InvitationStatus,
  InvitationStatusEnum,
} from '../../../invitation/domain/InvitationStatus';

@Injectable()
export class GetterMatchesInvitationService {
  constructor(
    private readonly finderAllInvitationService: FinderAllInvitationService,
  ) {}

  async run(status: string): Promise<{ total: number }> {
    const invitations = await this.finderAllInvitationService.run();

    const invitationStatus = this.ensureInvitationStatusIsValid(status);

    if (!invitationStatus) {
      return {
        total: invitations.length,
      };
    }

    const invitationsStatus = invitations.filter((invitation) =>
      invitation.status.equals(invitationStatus),
    );

    return {
      total: invitationsStatus.length,
    };
  }

  private ensureInvitationStatusIsValid(
    invitationStatus: string,
  ): InvitationStatus | null {
    switch (invitationStatus) {
      case InvitationStatusEnum.PENDING:
        return new InvitationStatus(InvitationStatusEnum.PENDING);
      case InvitationStatusEnum.ACCEPTED:
        return new InvitationStatus(InvitationStatusEnum.ACCEPTED);
      case InvitationStatusEnum.REJECTED:
        return new InvitationStatus(InvitationStatusEnum.REJECTED);
      default:
        return null;
    }
  }
}
