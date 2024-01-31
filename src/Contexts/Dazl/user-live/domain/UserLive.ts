import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserLiveId } from './UserLiveId';
import { UserLiveActive } from './UserLiveActive';
import { UserLiveExpirationDate } from './UserLiveExpirationDate';
import { UserLiveActiveDate } from './UserLiveActiveDate';
import { UserId } from '../../users/domain/UserId';
import { UserLiveStatus } from './UserLiveStatus';
import { UserLiveStatusInactivedDomainEvent } from './UserLiveStatusInactivedDomainEvent';

type Primitive = {
  id: string;
  active: number;
  userId: string;
  status: string;
  expirationDate: string;
  activeDate: string;
  createdAt: string;
  updatedAt: string;
};

type Params = {
  id: string;
  userId: string;
  active: number;
  expirationDate: string;
  activeDate: string;
};

export class UserLive extends AggregateRoot {
  readonly id: UserLiveId;
  readonly userId: UserId;
  private _active: UserLiveActive;
  private _status: UserLiveStatus;
  private _expirationDate: UserLiveExpirationDate;
  private _activeDate: UserLiveActiveDate;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;

  constructor(
    id: UserLiveId,
    userId: UserId,
    active: UserLiveActive,
    status: UserLiveStatus,
    expirationDate: UserLiveExpirationDate,
    activeDate: UserLiveActiveDate,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this._active = active;
    this._status = status;
    this._expirationDate = expirationDate;
    this._activeDate = activeDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  get status(): UserLiveStatus {
    return this._status;
  }

  set status(value: UserLiveStatus) {
    this._status = value;
  }
  get activeDate(): UserLiveActiveDate {
    return this._activeDate;
  }

  set activeDate(value: UserLiveActiveDate) {
    this._activeDate = value;
  }
  get expirationDate(): UserLiveExpirationDate {
    return this._expirationDate;
  }

  set expirationDate(value: UserLiveExpirationDate) {
    this._expirationDate = value;
  }
  get active(): UserLiveActive {
    return this._active;
  }

  set active(value: UserLiveActive) {
    this._active = value;
  }
  static create(params: Params): UserLive {
    return new UserLive(
      new UserLiveId(params.id),
      new UserId(params.userId),
      new UserLiveActive(params.active),
      new UserLiveStatus('active'),
      new UserLiveExpirationDate(params.expirationDate),
      new UserLiveActiveDate(params.activeDate),
      new CreatedAt(new Date().toISOString()),
      new UpdatedAt(new Date().toISOString()),
    );
  }

  toPrimitives(): Primitive {
    return {
      id: this.id.value,
      active: this._active.value,
      userId: this.userId.value,
      status: this._status.value,
      expirationDate: this._expirationDate.value,
      activeDate: this._activeDate.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  activeLive() {
    this._status = new UserLiveStatus('active');
  }

  holdingLive(time: number) {
    this._status = new UserLiveStatus('holding');
    this._activeDate = new UserLiveActiveDate(new Date().toISOString());
    const expirationDate = new Date().getTime() + time;
    this._expirationDate = new UserLiveExpirationDate(
      new Date(expirationDate).toISOString(),
    );
  }

  desactiveLive() {
    this._status = new UserLiveStatus('inactive');
    this.record(
      new UserLiveStatusInactivedDomainEvent({
        aggregateId: this.id.value,
        userId: this.userId.value,
      }),
    );
  }

  isExpirated() {
    const expirationDate = new Date(this._expirationDate.value).getTime();
    const now = new Date().getTime();
    return expirationDate <= now;
  }
}
