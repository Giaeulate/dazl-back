import { ChannelRepository } from '../../domain/ChannelRepository';
import { ChannelId } from '../../domain/ChannelId';
import { Channel } from '../../domain/Channel';
export declare class FinderChannelService {
    private readonly channelRepository;
    constructor(channelRepository: ChannelRepository);
    run(channelId: ChannelId): Promise<Channel>;
    private ensureChannelExists;
}
