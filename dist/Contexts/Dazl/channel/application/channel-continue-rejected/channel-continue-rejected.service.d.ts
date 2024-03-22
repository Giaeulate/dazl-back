import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
export declare class ChannelContinueRejectedService {
    private readonly channelRepository;
    private readonly moduleGateway;
    private readonly finderUserActivationService;
    private readonly finderChannelService;
    private readonly sendNotificationService;
    constructor(channelRepository: ChannelRepository, moduleGateway: ModuleGateway, finderUserActivationService: UserActivationFinder, finderChannelService: FinderChannelService, sendNotificationService: SendNotificationService);
    run({ userActivationToId, idChannel, }: {
        userActivationToId: string;
        idChannel: string;
    }): Promise<void>;
}
