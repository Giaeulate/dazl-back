import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
type Params = {
    channelId: string;
    userActivationId: string;
};
export declare class HideChannelUser {
    private readonly channelUserRepository;
    constructor(channelUserRepository: ChannelUserRepository);
    run({ channelId, userActivationId }: Params): Promise<void>;
}
export {};
