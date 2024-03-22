import { SchedulerRegistry } from '@nestjs/schedule';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelCreatedDomainEvent } from '../../domain/ChannelCreatedDomainEvent';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { GetterCronService } from '../getter-cron/getter-cron.service';
export declare class ActiveCronReminderOnChannelCreated {
    private readonly channelUserRepository;
    private readonly schedulerRegistry;
    private readonly finderUserActivationService;
    private readonly moduleGateway;
    private readonly userFinderService;
    private readonly fileFinderService;
    private readonly finderChannelService;
    private readonly sendNotificationService;
    private readonly getterCronService;
    constructor(channelUserRepository: ChannelUserRepository, schedulerRegistry: SchedulerRegistry, finderUserActivationService: UserActivationFinder, moduleGateway: ModuleGateway, userFinderService: UserFinderService, fileFinderService: FileFinderService, finderChannelService: FinderChannelService, sendNotificationService: SendNotificationService, getterCronService: GetterCronService);
    on(event: ChannelCreatedDomainEvent): Promise<void>;
    private callback;
}
