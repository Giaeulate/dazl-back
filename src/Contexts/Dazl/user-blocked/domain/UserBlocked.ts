import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserId } from '../../users/domain/UserId';
import { UserBlockedId } from './UserBlockedId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserBlockedActive } from './UserBlockedActive';

export class UserBlocked extends AggregateRoot {
  set active(value: UserBlockedActive) {
    this._active = value;
  }

  set updatedAt(value: UpdatedAt) {
    this._updatedAt = value;
  }
  readonly id: UserBlockedId;
  readonly userBlocked: UserId;
  readonly userWhoBlocked: UserId;
  private _active: UserBlockedActive;
  readonly createdAt: CreatedAt;
  private _updatedAt: UpdatedAt;

  constructor(
    id: UserBlockedId,
    userBlocked: UserId,
    userWhoBlocked: UserId,
    active: UserBlockedActive,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.userBlocked = userBlocked;
    this.userWhoBlocked = userWhoBlocked;
    this._active = active;
    this.createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  get active(): UserBlockedActive {
    return this._active;
  }

  static create(params: {
    id: string;
    userBlocked: string;
    userWhoBlocked: string;
  }): UserBlocked {
    return new UserBlocked(
      new UserBlockedId(params.id),
      new UserId(params.userBlocked),
      new UserId(params.userWhoBlocked),
      new UserBlockedActive(1),
      new CreatedAt(new Date().toISOString()),
      new UpdatedAt(new Date().toISOString()),
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      userBlocked: this.userBlocked.value,
      userWhoBlocked: this.userWhoBlocked.value,
      createdAt: this.createdAt.value,
      updatedAt: this._updatedAt.value,
    };
  }

  isActive() {
    console.log(this._active.value);
    console.log(this._active.value === 1);
    return this._active.value === 1;
  }

  unblock() {
    this._active = new UserBlockedActive(0);
    this._updatedAt = new UpdatedAt(new Date().toISOString());
  }
}
