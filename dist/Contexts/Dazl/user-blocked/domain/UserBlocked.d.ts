import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserId } from '../../users/domain/UserId';
import { UserBlockedId } from './UserBlockedId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserBlockedActive } from './UserBlockedActive';
export declare class UserBlocked extends AggregateRoot {
    set active(value: UserBlockedActive);
    set updatedAt(value: UpdatedAt);
    readonly id: UserBlockedId;
    readonly userBlocked: UserId;
    readonly userWhoBlocked: UserId;
    private _active;
    readonly createdAt: CreatedAt;
    private _updatedAt;
    constructor(id: UserBlockedId, userBlocked: UserId, userWhoBlocked: UserId, active: UserBlockedActive, createdAt: CreatedAt, updatedAt: UpdatedAt);
    get updatedAt(): UpdatedAt;
    get active(): UserBlockedActive;
    static create(params: {
        id: string;
        userBlocked: string;
        userWhoBlocked: string;
    }): UserBlocked;
    toPrimitives(): any;
    isActive(): boolean;
    unblock(): void;
}
