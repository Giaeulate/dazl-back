import { MessageDto } from '../../domain/dto/request/MessageDto';
import { MessageRepository } from '../../domain/MessageRepository';
import { Message } from '../../domain/Message';
import { MessageTypeEnum } from '../../domain/MessageType';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
export declare class CreatorMessageService {
    private readonly messageRepository;
    private readonly eventBus;
    constructor(messageRepository: MessageRepository, eventBus: EventBus);
    run(messageDto: MessageDto, type: MessageTypeEnum): Promise<Message>;
}
