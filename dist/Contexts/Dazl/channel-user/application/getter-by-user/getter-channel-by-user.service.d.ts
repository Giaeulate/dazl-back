import { ChannelUserRepository } from '../../domain/ChannelUserRepository';
import { ChannelRepository } from '../../../channel/domain/ChannelRepository';
import { ChannelUserChatDto } from '../../domain/dto/ChannelUserChatDto';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { GetterUnreadMessageService } from '../../../message/application/getter-unread/getter-unread-message.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterCronService } from '../../../channel/application/getter-cron/getter-cron.service';
export declare class GetterChannelByUserService {
    private readonly channelUserRepository;
    private readonly channelRepository;
    private readonly finderUserActivationService;
    private readonly userFinderService;
    private readonly fileFinderService;
    private readonly getterUnreadMessageService;
    private readonly getterCronService;
    constructor(channelUserRepository: ChannelUserRepository, channelRepository: ChannelRepository, finderUserActivationService: UserActivationFinder, userFinderService: UserFinderService, fileFinderService: FileFinderService, getterUnreadMessageService: GetterUnreadMessageService, getterCronService: GetterCronService);
    run(userActivationId: string): Promise<ChannelUserChatDto[]>;
}
