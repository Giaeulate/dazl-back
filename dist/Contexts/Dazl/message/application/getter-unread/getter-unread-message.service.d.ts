import { FinderAllMessageService } from '../finder-all/finder-all-message.service';
import { ChannelId } from '../../../channel/domain/ChannelId';
import { Message } from '../../domain/Message';
import { UserActivationId } from '../../../user_activation/domain/UserActivationId';
export declare class GetterUnreadMessageService {
    private readonly finderAllMessageService;
    constructor(finderAllMessageService: FinderAllMessageService);
    run(channelId: ChannelId, userActivationId: UserActivationId): Promise<Array<Message>>;
}
