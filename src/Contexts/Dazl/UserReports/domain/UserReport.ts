import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserReportId } from './UserReportId';
import { UserId } from '../../users/domain/UserId';
import { UserReportReason } from './UserReportReason';

export class UserReport extends AggregateRoot {
  readonly id: UserReportId;
  readonly userWhoReported: UserId;
  readonly userWhoWasReported: UserId;
  readonly reason: UserReportReason;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;

  constructor(
    id: UserReportId,
    userWhoReported: UserId,
    userWhoWasReported: UserId,
    reason: UserReportReason,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.userWhoReported = userWhoReported;
    this.userWhoWasReported = userWhoWasReported;
    this.reason = reason;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    id: UserReportId,
    userWhoReported: UserId,
    userWhoWasReported: UserId,
    reason: UserReportReason,
  ) {
    const createdAt = new CreatedAt(new Date().toISOString());
    const updatedAt = new UpdatedAt(new Date().toISOString());
    return new UserReport(
      id,
      userWhoReported,
      userWhoWasReported,
      reason,
      createdAt,
      updatedAt,
    );
  }

  static fromPrimitives(plainData: {
    id: string;
    userWhoReported: string;
    userWhoWasReported: string;
    reason: string;
    createdAt: string;
    updatedAt: string;
  }) {
    return new UserReport(
      new UserReportId(plainData.id),
      new UserId(plainData.userWhoReported),
      new UserId(plainData.userWhoWasReported),
      new UserReportReason(plainData.reason),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      userWhoReported: this.userWhoReported.value,
      userWhoWasReported: this.userWhoWasReported.value,
      reason: this.reason.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
