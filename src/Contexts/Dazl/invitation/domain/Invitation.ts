import { InvitationId } from './InvitationId';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { InvitationStatus, InvitationStatusEnum } from './InvitationStatus';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { InvitationDto } from './dto/InvitationDto';
import { InvitationCreatedDomainEvent } from './InvitationCreatedDomainEvent';
import { UserActivationId } from '../../user_activation/domain/UserActivationId';
import { InvitationStatusAcceptedChangedDomainEvent } from './InvitationStatusAcceptedChangedDomainEvent';

export class Invitation extends AggregateRoot {
  id: InvitationId;
  userActivationFromId: UserActivationId;
  userActivationToId: UserActivationId;
  private _status: InvitationStatus;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  get status(): InvitationStatus {
    return this._status;
  }

  cancel(): void {
    this._status = new InvitationStatus(InvitationStatusEnum.CANCEL);
  }

  constructor(
    id: InvitationId,
    userActivationFromId: UserActivationId,
    userActivationToId: UserActivationId,
  ) {
    super();
    this.id = id;
    this.userActivationFromId = userActivationFromId;
    this.userActivationToId = userActivationToId;
    this._status = new InvitationStatus(InvitationStatusEnum.PENDING);
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  public static create(plainData: {
    id: string;
    userActivationFromId: string;
    userActivationToId: string;
  }): Invitation {
    const invitationFromPrimitives = Invitation.fromPrimitives(plainData);
    const invitation = new Invitation(
      invitationFromPrimitives.id,
      invitationFromPrimitives.userActivationFromId,
      invitationFromPrimitives.userActivationToId,
    );
    invitation.record(
      new InvitationCreatedDomainEvent({
        aggregateId: invitation.id.value,
        userActivationFromId: invitation.userActivationFromId.value,
        userActivationToId: invitation.userActivationToId.value,
      }),
    );
    return invitation;
  }

  static fromPrimitives(plainData: {
    id: string;
    userActivationFromId: string;
    userActivationToId: string;
  }): Invitation {
    return new Invitation(
      new InvitationId(plainData.id),
      new UserActivationId(plainData.userActivationFromId),
      new UserActivationId(plainData.userActivationToId),
    );
  }

  public toPrimitives(): InvitationDto {
    return {
      id: this.id?.value,
      userActivationFromId: this.userActivationFromId?.value,
      userActivationToId: this.userActivationToId?.value,
      status: this._status?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
    };
  }

  accept(): void {
    this._status = new InvitationStatus(InvitationStatusEnum.ACCEPTED);
    this.record(
      new InvitationStatusAcceptedChangedDomainEvent({
        aggregateId: this.id.value,
        userActivationFromId: this.userActivationFromId.value,
        userActivationToId: this.userActivationToId.value,
      }),
    );
  }

  set status(value: InvitationStatus) {
    this._status = value;
  }
  reject() {
    this._status = new InvitationStatus(InvitationStatusEnum.REJECTED);
  }
}
