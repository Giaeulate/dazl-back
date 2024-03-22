import { FinderChannelService } from '../../../channel/application/finder/finder-channel.service';
import { FinderAllMessageService } from '../finder-all/finder-all-message.service';
import { MessageRepository } from '../../domain/MessageRepository';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { GetterUnreadMessageService } from '../getter-unread/getter-unread-message.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { FinderByMessageService } from '../../../message-file/application/finder-by-message/finder-by-message.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
export declare class ReadMessageService {
    private readonly finderUserActivationService;
    private readonly finderChannelService;
    private readonly finderAllMessageService;
    private readonly messageRepository;
    private readonly moduleGateway;
    private readonly getterUnreadMessageService;
    private readonly finderByMessageService;
    private readonly fileFinderService;
    constructor(finderUserActivationService: UserActivationFinder, finderChannelService: FinderChannelService, finderAllMessageService: FinderAllMessageService, messageRepository: MessageRepository, moduleGateway: ModuleGateway, getterUnreadMessageService: GetterUnreadMessageService, finderByMessageService: FinderByMessageService, fileFinderService: FileFinderService);
    run(userToId: string, channelId: string): Promise<void>;
}
