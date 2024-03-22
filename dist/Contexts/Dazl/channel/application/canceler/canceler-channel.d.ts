import { ChannelId } from '../../domain/ChannelId';
import { FinderChannelService } from '../finder/finder-channel.service';
import { UpdaterChannel } from '../updater/updater-channel';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../user_activation/application/getter-current-status/getter-user-activation-status.service';
export declare class CancelerChannel {
    private readonly finderChannelService;
    private readonly updaterChannel;
    private readonly channelUserRepository;
    private readonly moduleGateway;
    private readonly finderUserActivationService;
    private readonly sendNotificationService;
    private readonly getterUserActivationStatusService;
    constructor(finderChannelService: FinderChannelService, updaterChannel: UpdaterChannel, channelUserRepository: ChannelUserRepository, moduleGateway: ModuleGateway, finderUserActivationService: UserActivationFinder, sendNotificationService: SendNotificationService, getterUserActivationStatusService: GetterUserActivationStatusService);
    run(id: ChannelId): Promise<void>;
    private cancelChannel;
}
