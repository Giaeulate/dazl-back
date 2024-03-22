import { ChannelRepository } from '../../domain/ChannelRepository';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelId } from '../../domain/ChannelId';
export declare class UpdaterChannel {
    private readonly channelRepository;
    private readonly finderChannelService;
    constructor(channelRepository: ChannelRepository, finderChannelService: FinderChannelService);
    run(id: ChannelId, plainData: {
        name?: string;
        thumb?: string;
        description?: string;
        active?: number;
        secondChance?: string;
        startTime?: string;
    }): Promise<void>;
}
