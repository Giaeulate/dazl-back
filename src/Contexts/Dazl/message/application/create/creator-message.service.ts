import { Inject, Injectable } from '@nestjs/common';
import { MessageDto } from '../../domain/dto/request/MessageDto';
import { MessageRepository } from '../../domain/MessageRepository';
import {
  EVENT_BUS,
  MESSAGE_REPOSITORY,
} from '../../../../Shared/domain/constants/constants';
import { Message } from '../../domain/Message';
import { IsBoolean } from '../../../Shared/IsBoolean';
import { MessageTypeEnum } from '../../domain/MessageType';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';

@Injectable()
export class CreatorMessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    @Inject(EVENT_BUS) private readonly eventBus: EventBus,
  ) {}

  async run(messageDto: MessageDto, type: MessageTypeEnum): Promise<Message> {
    const message = Message.create({
      id: messageDto.id,
      text: messageDto.text,
      active: IsBoolean.TRUE,
      type: messageDto.response ? MessageTypeEnum.RESPONSE : type,
      isSent: IsBoolean.TRUE,
      channelId: messageDto.channel,
      userFromId: messageDto.userFromId,
      userToId: messageDto.userToId,
      response: messageDto.response ? messageDto.response : '',
    });
    await this.messageRepository.save(message);
    await this.eventBus.publish(message.pullDomainEvents());
    return message;
  }
}
