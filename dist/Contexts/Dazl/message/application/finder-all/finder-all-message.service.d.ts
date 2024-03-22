import { MessageRepository } from '../../domain/MessageRepository';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { Message } from '../../domain/Message';
export declare class FinderAllMessageService {
    private readonly messageRepository;
    constructor(messageRepository: MessageRepository);
    run(channelId: ChannelId): Promise<Array<Message>>;
    private ensureMessagesExists;
}
