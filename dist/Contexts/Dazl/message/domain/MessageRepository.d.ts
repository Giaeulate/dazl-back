import { Message } from './Message';
import { Nullable } from '../../../Shared/domain/Nullable';
import { MessageId } from './MessageId';
import { ChannelId } from '../../channel/domain/ChannelId';
export interface MessageRepository {
    save(message: Message): Promise<void>;
    search(id: MessageId): Promise<Nullable<Message>>;
    searchByChannelId(channelId: ChannelId): Promise<Nullable<Message[]>>;
}
