import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { UserId } from '../../users/domain/UserId';
import { MessageId } from '../../message/domain/MessageId';
import { ComplaintId } from './ComplaintId';

export class Complaint extends AggregateRoot {
  id: ComplaintId;
  messageId: MessageId;
  complainantId: UserId;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    id: ComplaintId,
    messageId: MessageId,
    complainantId: UserId,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.messageId = messageId;
    this.complainantId = complainantId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static create(plainData: {
    id: string;
    messageId: string;
    complainantId: string;
  }): Complaint {
    const complaintFromPrimitives = Complaint.fromPrimitives({
      ...plainData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const complaint = new Complaint(
      complaintFromPrimitives.id,
      complaintFromPrimitives.messageId,
      complaintFromPrimitives.complainantId,
      complaintFromPrimitives.createdAt,
      complaintFromPrimitives.updatedAt,
    );
    // complaint.record(new ComplaintCreatedDomainEvent(complaint));
    return complaint;
  }

  public static fromPrimitives(plainData: {
    id: string;
    messageId: string;
    complainantId: string;
    createdAt: string;
    updatedAt: string;
  }): Complaint {
    return new Complaint(
      new ComplaintId(plainData.id),
      new MessageId(plainData.messageId),
      new UserId(plainData.complainantId),
      new CreatedAt(plainData.createdAt),
      new UpdatedAt(plainData.updatedAt),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      messageId: this.messageId.value,
      complainantId: this.complainantId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
