import { ContinueChannelService } from '../../../../Contexts/Dazl/channel/application/continue-channel/continue-channel.service';
import { ContinueChannelRequestDto } from '../../../../Contexts/Dazl/channel/application/continue-channel/dto/ContinueChannelRequestDto';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { ChannelUserByChannelFinder } from '../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';
export declare class ContinueChannelController {
    private readonly continueChannelService;
    private readonly getterChannelByUserService;
    private readonly channelUserByChannelFinder;
    constructor(continueChannelService: ContinueChannelService, getterChannelByUserService: GetterChannelByUserService, channelUserByChannelFinder: ChannelUserByChannelFinder);
    run(idChannel: string, request: ContinueChannelRequestDto): Promise<unknown>;
}
