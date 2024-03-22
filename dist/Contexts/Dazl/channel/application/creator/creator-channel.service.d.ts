import { ChannelRepository } from '../../domain/ChannelRepository';
import { Channel } from '../../domain/Channel';
export declare class CreatorChannelService {
    private readonly channelRepository;
    constructor(channelRepository: ChannelRepository);
    run(): Promise<Channel>;
}
