import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelUserId } from '../../domain/ChannelUserId';
import { ChannelUser } from '../../domain/ChannelUser';
export declare class FinderChannelUserService {
    private readonly channelUserRepository;
    constructor(channelUserRepository: ChannelUserRepository);
    run(channelUserId: ChannelUserId): Promise<ChannelUser>;
    private ensureChannelUserExists;
}
