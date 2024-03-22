import { ChannelUser } from '../../domain/ChannelUser';
import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
export declare class CreatorChannelUserService {
    private readonly channelUserRepository;
    constructor(channelUserRepository: ChannelUserRepository);
    run({ channel, userActivation, }: {
        channel: string;
        userActivation: string;
    }): Promise<ChannelUser>;
}
