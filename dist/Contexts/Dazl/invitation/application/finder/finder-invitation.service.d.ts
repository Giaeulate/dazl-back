import { InvitationId } from '../../domain/InvitationId';
import { InvitationRepository } from '../../domain/InvitationRepository';
import { Invitation } from '../../domain/Invitation';
export declare class FinderInvitationService {
    private readonly invitationRepository;
    constructor(invitationRepository: InvitationRepository);
    run(invitationId: InvitationId): Promise<Invitation>;
    private ensureInvitationExists;
}
