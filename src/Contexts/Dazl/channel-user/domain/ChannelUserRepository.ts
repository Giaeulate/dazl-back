import { Nullable } from '../../../Shared/domain/Nullable';
import { ChannelUserId } from './ChannelUserId';
import { ChannelUser } from './ChannelUser';
import { UserActivationId } from '../../user_activation/domain/UserActivationId';
import { ChannelId } from '../../channel/domain/ChannelId';

export interface ChannelUserRepository {
  save(channelUser: ChannelUser): Promise<void>;
  search(id: ChannelUserId): Promise<Nullable<ChannelUser>>;
  searchByUserActivationId(
    userActivationId: UserActivationId,
  ): Promise<Array<ChannelUser>>;
  searchByChannelId(channelId: ChannelId): Promise<Array<ChannelUser>>;
  searchByChannelIdAndUserActivationId(
    channelId: ChannelId,
    userActivationId: UserActivationId,
  ): Promise<Nullable<ChannelUser>>;
}
