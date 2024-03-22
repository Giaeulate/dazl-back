import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
type Params = {
    userActivationId: UserActivationId;
};
export declare class ChannelsAvailableGetter {
    private readonly channelUserRepository;
    constructor(channelUserRepository: ChannelUserRepository);
    run(params: Params): Promise<import("../../domain/ChannelUser").ChannelUser[]>;
}
export {};
