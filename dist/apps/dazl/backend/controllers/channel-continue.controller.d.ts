import { ChannelContinueRejectedService } from '../../../../Contexts/Dazl/channel/application/channel-continue-rejected/channel-continue-rejected.service';
import { ChannelContinueAcceptedService } from '../../../../Contexts/Dazl/channel/application/channel-continue-accepted/channel-continue-accepted.service';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { ChannelUserByChannelFinder } from '../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';
export declare class ChannelContinueController {
    private readonly channelContinueAcceptedService;
    private readonly channelContinueRejectedService;
    private readonly getterChannelByUserService;
    private readonly channelUserByChannelFinder;
    constructor(channelContinueAcceptedService: ChannelContinueAcceptedService, channelContinueRejectedService: ChannelContinueRejectedService, getterChannelByUserService: GetterChannelByUserService, channelUserByChannelFinder: ChannelUserByChannelFinder);
    runAccepted(userActivationToId: string, userActivationId: string, idChannel: string): Promise<unknown>;
    runRejected(userActivationToId: string, userActivationId: string, idChannel: string): Promise<unknown>;
}
