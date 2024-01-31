import { Channel } from './Channel';
import { ChannelId } from './ChannelId';
import { Nullable } from '../../../Shared/domain/Nullable';

export interface ChannelRepository {
  save(channel: Channel): Promise<void>;
  search(id: ChannelId): Promise<Nullable<Channel>>;
  searchAll(): Promise<Array<Channel>>;
}
