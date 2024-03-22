import { MessageRepository } from '../../domain/MessageRepository';
import { MessageId } from '../../domain/MessageId';
import { Message } from '../../domain/Message';
export declare class FinderMessageService {
    private readonly messageRepository;
    constructor(messageRepository: MessageRepository);
    run(messageId: MessageId): Promise<Message>;
    private ensureMessageExists;
}
