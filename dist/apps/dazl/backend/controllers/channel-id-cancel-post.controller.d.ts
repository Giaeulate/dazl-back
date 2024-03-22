import { CancelerChannel } from '../../../../Contexts/Dazl/channel/application/canceler/canceler-channel';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { ChannelUserByChannelFinder } from '../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';
export declare class ChannelIdCancelPostController {
    private readonly cancelerChannel;
    private readonly getterChannelByUserService;
    private readonly channelUserByChannelFinder;
    constructor(cancelerChannel: CancelerChannel, getterChannelByUserService: GetterChannelByUserService, channelUserByChannelFinder: ChannelUserByChannelFinder);
    run(id: string, userActivationToId: string): Promise<unknown>;
}
