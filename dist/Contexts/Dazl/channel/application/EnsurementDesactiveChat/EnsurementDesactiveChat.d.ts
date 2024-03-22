import { ChannelRepository } from '../../domain/ChannelRepository';
export declare class EnsurementDesactiveChat {
    private readonly channelRepository;
    constructor(channelRepository: ChannelRepository);
    run(): Promise<void>;
}
