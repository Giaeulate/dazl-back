import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserReportId } from './UserReportId';
import { UserId } from '../../users/domain/UserId';
import { UserReportReason } from './UserReportReason';
export declare class UserReport extends AggregateRoot {
    readonly id: UserReportId;
    readonly userWhoReported: UserId;
    readonly userWhoWasReported: UserId;
    readonly reason: UserReportReason;
    readonly createdAt: CreatedAt;
    readonly updatedAt: UpdatedAt;
    constructor(id: UserReportId, userWhoReported: UserId, userWhoWasReported: UserId, reason: UserReportReason, createdAt: CreatedAt, updatedAt: UpdatedAt);
    static create(id: UserReportId, userWhoReported: UserId, userWhoWasReported: UserId, reason: UserReportReason): UserReport;
    static fromPrimitives(plainData: {
        id: string;
        userWhoReported: string;
        userWhoWasReported: string;
        reason: string;
        createdAt: string;
        updatedAt: string;
    }): UserReport;
    toPrimitives(): {
        id: string;
        userWhoReported: string;
        userWhoWasReported: string;
        reason: string;
        createdAt: string;
        updatedAt: string;
    };
}
