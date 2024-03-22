import { UserId } from '../../users/domain/UserId';
import { UserActiveHistoryStartTime } from './UserActiveHistoryStartTime';
import { UserActiveHistoryEndTime } from './UserActiveHistoryEndTime';
import { UserActiveHistoryId } from './UserActiveHistoryId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserActiveHistoryStatus } from './UserActiveHistoryStatus';
export declare class UserActiveHistory extends AggregateRoot {
    id: UserActiveHistoryId;
    userId: UserId;
    startTime: UserActiveHistoryStartTime;
    endTime: UserActiveHistoryEndTime;
    status: UserActiveHistoryStatus;
    createdAt: CreatedAt;
    updatedAt: UpdatedAt;
    constructor(userId: UserId, startTime: UserActiveHistoryStartTime, endTime: UserActiveHistoryEndTime);
    static create(plainData: {
        userId: string;
        startTime: string;
        endTime: string;
    }): UserActiveHistory;
    private static fromPrimitives;
    toPrimitives(): any;
}
