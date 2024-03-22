import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
export declare class ChannelByUserActivationFinder {
    private readonly channelUserRepository;
    constructor(channelUserRepository: ChannelUserRepository);
    run({ userActivationId }: {
        userActivationId: UserActivationId;
    }): Promise<import("../../domain/ChannelUser").ChannelUser[]>;
}
