import { GetterChannelByUserService } from '../getter-by-user/getter-channel-by-user.service';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
import { ChannelByUserActivationFinder } from '../FindByUserActivationId/ChannelByUserActivationFinder';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChannelUserByChannelFinder } from '../FindByChannel/ChannelUserByChannelFinder';
type Params = {
    userActivationId: UserActivationId;
};
export declare class UpdateActiveChatSender {
    private readonly getterChannelByUserService;
    private readonly finder;
    private readonly gateway;
    private readonly finderUserActivationService;
    private readonly channelUserByChannelFinder;
    constructor(getterChannelByUserService: GetterChannelByUserService, finder: ChannelByUserActivationFinder, gateway: ModuleGateway, finderUserActivationService: UserActivationFinder, channelUserByChannelFinder: ChannelUserByChannelFinder);
    run(params: Params): Promise<void>;
}
export {};
