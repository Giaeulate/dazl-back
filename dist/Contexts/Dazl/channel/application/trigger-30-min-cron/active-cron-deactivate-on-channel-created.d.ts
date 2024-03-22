import { SchedulerRegistry } from '@nestjs/schedule';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { UpdaterChannel } from '../updater/updater-channel';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelCreatedDomainEvent } from '../../domain/ChannelCreatedDomainEvent';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { NotificationsService } from '../../../notification/application/push-notification/push-notification.service';
export declare class ActiveCronDeactivateOnChannelCreated {
    private readonly channelUserRepository;
    private readonly schedulerRegistry;
    private readonly moduleGateway;
    private readonly userFinderService;
    private readonly fileFinderService;
    private readonly finderUserActivationService;
    private readonly updaterChannel;
    private readonly finderChannelService;
    private readonly sendNotificationService;
    constructor(channelUserRepository: ChannelUserRepository, schedulerRegistry: SchedulerRegistry, moduleGateway: ModuleGateway, userFinderService: UserFinderService, fileFinderService: FileFinderService, finderUserActivationService: UserActivationFinder, updaterChannel: UpdaterChannel, finderChannelService: FinderChannelService, sendNotificationService: NotificationsService);
    on(event: ChannelCreatedDomainEvent): Promise<void>;
    private callback;
}
