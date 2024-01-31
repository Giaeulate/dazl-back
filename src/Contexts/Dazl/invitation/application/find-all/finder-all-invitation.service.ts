import { Inject } from '@nestjs/common';
import { INVITATION_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { InvitationRepository } from '../../domain/InvitationRepository';

export class FinderAllInvitationService {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
  ) {}
  async run() {
    return this.invitationRepository.searchAll();
  }
}
