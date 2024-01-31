import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { MessageId } from './MessageId';
import { MessageText } from './MessageText';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserActivationId } from '../../user_activation/domain/UserActivationId';
import { ChannelId } from '../../channel/domain/ChannelId';
import { MessageIsSent } from './MessageIsSent';
import { MessageActive } from './MessageActive';
import { MessageType } from './MessageType';
import { MessageUserReadId } from './MessageUserReadId';
import { MessageCreatedDomainEvent } from './MessageCreatedDomainEvent';
import { MessageReported } from './MessageReported';
import { MessageResponse } from './MessageResponse';

export class Message extends AggregateRoot {
  id: MessageId;
  text: MessageText;
  isSent: MessageIsSent;
  active: MessageActive;
  type: MessageType;
  channelId: ChannelId;
  userToId: UserActivationId;
  useFromId: UserActivationId;
  userReadId: MessageUserReadId;
  reported: MessageReported;
  response: MessageResponse;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;

  constructor(
    id: MessageId,
    text: MessageText,
    isSent: MessageIsSent,
    type: MessageType,
    active: MessageActive,
    channelId: ChannelId,
    useFromId: UserActivationId,
    userToId: UserActivationId,
    userReadId: MessageUserReadId,
    reported: MessageReported,
    response: MessageResponse,
  ) {
    super();
    this.id = id;
    this.text = text;
    this.isSent = isSent;
    this.type = type;
    this.active = active;
    this.channelId = channelId;
    this.useFromId = useFromId;
    this.userToId = userToId;
    this.userReadId = userReadId;
    this.reported = reported;
    this.response = response;
    this.createdAt = new CreatedAt(new Date().toISOString());
    this.updatedAt = new UpdatedAt(new Date().toISOString());
  }

  static create(plainData: {
    id: string;
    text: string;
    isSent: number;
    type: string;
    active: number;
    channelId: string;
    userFromId: string;
    userToId: string;
    response: string;
  }): Message {
    const messageFromPrimitives = this.fromPrimitives({
      ...plainData,
      reported: false,
    });
    const message = new Message(
      messageFromPrimitives.id,
      messageFromPrimitives.text,
      messageFromPrimitives.isSent,
      messageFromPrimitives.type,
      messageFromPrimitives.active,
      messageFromPrimitives.channelId,
      messageFromPrimitives.useFromId,
      messageFromPrimitives.userToId,
      messageFromPrimitives.userToId,
      messageFromPrimitives.reported,
      messageFromPrimitives.response,
    );
    message.record(
      new MessageCreatedDomainEvent({
        aggregateId: message.id.value,
        text: message.text.value,
        userToId: message.userToId.value,
        userFromId: message.useFromId.value,
        channelId: message.channelId.value,
        type: message.type.value,
      }),
    );
    return message;
  }

  static fromPrimitives(plainData: {
    id: string;
    text: string;
    isSent: number;
    type: string;
    active: number;
    channelId: string;
    userFromId: string;
    userToId: string;
    reported: boolean;
    response: string;
  }): Message {
    return new Message(
      new MessageId(plainData.id),
      new MessageText(plainData.text),
      new MessageIsSent(plainData.isSent),
      new MessageType(plainData.type),
      new MessageActive(plainData.active),
      new ChannelId(plainData.channelId),
      new UserActivationId(plainData.userFromId),
      new UserActivationId(plainData.userToId),
      new MessageUserReadId(plainData.userToId),
      new MessageReported(plainData.reported),
      new MessageResponse(plainData.response),
    );
  }

  toPrimitives = () => ({
    id: this.id?.value,
    text: this.text?.value,
    isSent: this.isSent?.value,
    type: this.type?.value,
    active: this.active?.value,
    channelId: this.channelId?.value,
    userFromId: this.useFromId?.value,
    userToId: this.userToId?.value,
    reported: this.reported?.value,
    response: this.response?.value,
    createdAt: this.createdAt?.value,
    updatedAt: this.updatedAt?.value,
  });

  desactive() {
    this.active = new MessageActive(0);
  }
}
