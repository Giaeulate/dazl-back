import { ChannelRepository } from '../../domain/ChannelRepository';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
import { ContinueChannelRequestDto } from './dto/ContinueChannelRequestDto';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { ChannelUserRepository } from '../../../channel-user/domain/ChannelUserRepository';
import { GetterCronService } from '../getter-cron/getter-cron.service';
import { UserFinderService } from '../../../../Shared/application/user/user-finder.service';
import { FileFinderService } from '../../../file/application/finder-file/file-finder.service';
export declare class ContinueChannelService {
    private readonly channelRepository;
    private readonly channelUserRepository;
    private readonly finderUserActivationService;
    private readonly moduleGateway;
    private readonly getterCronService;
    private readonly userFinderService;
    private readonly fileFinderService;
    constructor(channelRepository: ChannelRepository, channelUserRepository: ChannelUserRepository, finderUserActivationService: UserActivationFinder, moduleGateway: ModuleGateway, getterCronService: GetterCronService, userFinderService: UserFinderService, fileFinderService: FileFinderService);
    run(idChannel: string, request: ContinueChannelRequestDto): Promise<void>;
}
