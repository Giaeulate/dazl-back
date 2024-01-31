import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InvitationId } from '../../domain/InvitationId';
import { INVITATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { InvitationRepository } from '../../domain/InvitationRepository';
import { Invitation } from '../../domain/Invitation';

@Injectable()
export class FinderInvitationService {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
  ) {}

  async run(invitationId: InvitationId) {
    const invitation = await this.invitationRepository.search(invitationId);
    this.ensureInvitationExists(invitation);
    return invitation;
  }

  private ensureInvitationExists(invitation: Invitation) {
    if (!invitation) throw new NotFoundException(' Invitation not found');
  }
}
