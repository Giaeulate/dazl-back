import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserId } from '../../users/domain/UserId';
import { MessageId } from '../../message/domain/MessageId';
import { ComplaintId } from './ComplaintId';
export declare class Complaint extends AggregateRoot {
    id: ComplaintId;
    messageId: MessageId;
    complainantId: UserId;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
    constructor(id: ComplaintId, messageId: MessageId, complainantId: UserId, createdAt: CreatedAt, updatedAt: UpdatedAt);
    static create(plainData: {
        id: string;
        messageId: string;
        complainantId: string;
    }): Complaint;
    static fromPrimitives(plainData: {
        id: string;
        messageId: string;
        complainantId: string;
        createdAt: string;
        updatedAt: string;
    }): Complaint;
    toPrimitives(): {
        id: string;
        messageId: string;
        complainantId: string;
        createdAt: string;
        updatedAt: string;
    };
}
