import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
export declare class ChannelsUserByUserGetController {
    private readonly getterChannelByUserService;
    constructor(getterChannelByUserService: GetterChannelByUserService);
    run(userActivationId: string): Promise<FormatResponse>;
}
