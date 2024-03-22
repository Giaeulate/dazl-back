import { InvitationRepository } from '../../domain/InvitationRepository';
export declare class FinderAllInvitationService {
    private readonly invitationRepository;
    constructor(invitationRepository: InvitationRepository);
    run(): Promise<import("../../domain/Invitation").Invitation[]>;
}
