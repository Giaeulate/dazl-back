import { InvitationId } from './InvitationId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { InvitationStatus } from './InvitationStatus';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { InvitationDto } from './dto/InvitationDto';
import { UserActivationId } from '../../user_activation/domain/UserActivationId';
export declare class Invitation extends AggregateRoot {
    id: InvitationId;
    userActivationFromId: UserActivationId;
    userActivationToId: UserActivationId;
    private _status;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
    get status(): InvitationStatus;
    cancel(): void;
    constructor(id: InvitationId, userActivationFromId: UserActivationId, userActivationToId: UserActivationId);
    static create(plainData: {
        id: string;
        userActivationFromId: string;
        userActivationToId: string;
    }): Invitation;
    static fromPrimitives(plainData: {
        id: string;
        userActivationFromId: string;
        userActivationToId: string;
    }): Invitation;
    toPrimitives(): InvitationDto;
    accept(): void;
    set status(value: InvitationStatus);
    reject(): void;
}
