import { CancelerChannel } from '../canceler/canceler-channel';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { UserId } from '../../../users/domain/UserId';
import { FinderUserActivationByUserActiveService } from '../../../user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service';
export declare class CancelChats {
    private readonly channelUserRepository;
    private readonly finderUserActivationByUserActiveService;
    private readonly canceler;
    constructor(channelUserRepository: ChannelUserRepository, finderUserActivationByUserActiveService: FinderUserActivationByUserActiveService, canceler: CancelerChannel);
    run(userId: UserId): Promise<void>;
}
