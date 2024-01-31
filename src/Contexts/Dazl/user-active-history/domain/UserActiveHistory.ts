import { UserId } from '../../users/domain/UserId';
import { UserActiveHistoryStartTime } from './UserActiveHistoryStartTime';
import { UserActiveHistoryEndTime } from './UserActiveHistoryEndTime';
import { UserActiveHistoryId } from './UserActiveHistoryId';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import {
  UserActiveHistoryStatus,
  UserActiveHistoryStatusEnum,
} from './UserActiveHistoryStatus';

export class UserActiveHistory extends AggregateRoot {
  id: UserActiveHistoryId;
  userId: UserId;
  startTime: UserActiveHistoryStartTime;
  endTime: UserActiveHistoryEndTime;
  status: UserActiveHistoryStatus;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    userId: UserId,
    startTime: UserActiveHistoryStartTime,
    endTime: UserActiveHistoryEndTime,
  ) {
    super();
    this.id = new UserActiveHistoryId(Uuid.random().value);
    this.userId = userId;
    this.startTime = startTime;
    this.status = new UserActiveHistoryStatus(
      UserActiveHistoryStatusEnum.HOLDING,
    );
    this.endTime = endTime;
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  static create(plainData: {
    userId: string;
    startTime: string;
    endTime: string;
  }): UserActiveHistory {
    const userActiveHistoryFromPrimitives = this.fromPrimitives(plainData);
    const userActiveHistory = new UserActiveHistory(
      userActiveHistoryFromPrimitives.userId,
      userActiveHistoryFromPrimitives.startTime,
      userActiveHistoryFromPrimitives.endTime,
    );
    return userActiveHistory;
  }

  private static fromPrimitives(plainData: {
    userId: string;
    startTime: string;
    endTime: string;
  }) {
    return new UserActiveHistory(
      new UserId(plainData.userId),
      new UserActiveHistoryStartTime(plainData.startTime),
      new UserActiveHistoryEndTime(plainData.endTime),
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      userId: this.userId.value,
      startTime: this.startTime.value,
      status: this.status.value,
      endTime: this.endTime.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
