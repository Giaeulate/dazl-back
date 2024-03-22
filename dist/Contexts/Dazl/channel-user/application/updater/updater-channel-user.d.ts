import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { FinderChannelUserService } from '../finder/finder-channel-user.service';
import { ChannelUserId } from '../../domain/ChannelUserId';
export declare class UpdaterChannelUser {
    private readonly channelUserRepository;
    private readonly finderChannelUserService;
    constructor(channelUserRepository: ChannelUserRepository, finderChannelUserService: FinderChannelUserService);
    run(id: ChannelUserId, plainData: {
        channelId: string;
        userActivationId: string;
    }): Promise<void>;
}
