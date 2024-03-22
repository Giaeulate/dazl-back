import { HideChannelUser } from '../../../../Contexts/Dazl/channel-user/application/hide/HideChannelUser';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
declare class BodyPutChannelUserHide {
    readonly user_activation_id: string;
    readonly channel_id: string;
}
export declare class PutChannelUserHideController {
    private readonly user;
    private readonly getterChannelByUserService;
    constructor(user: HideChannelUser, getterChannelByUserService: GetterChannelByUserService);
    run({ user_activation_id, channel_id }: BodyPutChannelUserHide): Promise<unknown>;
}
export {};
