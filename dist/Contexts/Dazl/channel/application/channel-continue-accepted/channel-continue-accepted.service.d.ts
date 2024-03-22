import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { FinderChannelService } from '../finder/finder-channel.service';
import { ChannelRepository } from '../../domain/ChannelRepository';
import { SchedulerRegistry } from '@nestjs/schedule';
import { SendNotificationService } from '../../../notification/application/send/send-notification.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { ChannelUserByChannelFinder } from '../../../channel-user/application/FindByChannel/ChannelUserByChannelFinder';
import { GetterChannelByUserService } from '../../../channel-user/application/getter-by-user/getter-channel-by-user.service';
export declare class ChannelContinueAcceptedService {
    private readonly channelRepository;
    private readonly channelUserRepository;
    private readonly moduleGateway;
    private readonly finderUserActivationService;
    private readonly finderChannelService;
    private readonly schedulerRegistry;
    private readonly sendNotificationService;
    private readonly channelUserByChannelFinder;
    private readonly getterChannelByUserService;
    constructor(channelRepository: ChannelRepository, channelUserRepository: ChannelUserRepository, moduleGateway: ModuleGateway, finderUserActivationService: UserActivationFinder, finderChannelService: FinderChannelService, schedulerRegistry: SchedulerRegistry, sendNotificationService: SendNotificationService, channelUserByChannelFinder: ChannelUserByChannelFinder, getterChannelByUserService: GetterChannelByUserService);
    run({ userActivationToId, idChannel, }: {
        userActivationToId: string;
        idChannel: string;
    }): Promise<void>;
    private callback;
}
