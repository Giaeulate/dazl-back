import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { InvitationRepository } from '../../domain/InvitationRepository';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
type Params = {
    userActivationId: UserActivationId;
};
export declare class InvitationReceivedCanceler {
    private readonly invitationRepository;
    private readonly eventBus;
    constructor(invitationRepository: InvitationRepository, eventBus: EventBus);
    run(params: Params): Promise<void>;
}
export {};
