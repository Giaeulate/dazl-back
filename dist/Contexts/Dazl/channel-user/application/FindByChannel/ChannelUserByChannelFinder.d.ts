import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelId } from '../../../channel/domain/ChannelId';
export declare class ChannelUserByChannelFinder {
    private readonly channelUserRepository;
    constructor(channelUserRepository: ChannelUserRepository);
    run(channelId: ChannelId): Promise<import("../../domain/ChannelUser").ChannelUser[]>;
}
