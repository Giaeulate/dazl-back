import { Invitation } from './Invitation';
import { InvitationId } from './InvitationId';
import { Nullable } from '../../../Shared/domain/Nullable';
import { UserActivationId } from '../../user_activation/domain/UserActivationId';
export interface InvitationRepository {
    save(invitation: Invitation): Promise<void>;
    search(id: InvitationId): Promise<Nullable<Invitation>>;
    searchAll(): Promise<Array<Invitation>>;
    searchAllByUserActivationFrom(from: UserActivationId): Promise<Array<Invitation>>;
    searchAllByUserActivationTo(to: UserActivationId): Promise<Array<Invitation>>;
    searchAllByUserActivation(to: UserActivationId, from: UserActivationId): Promise<Array<Invitation>>;
}
