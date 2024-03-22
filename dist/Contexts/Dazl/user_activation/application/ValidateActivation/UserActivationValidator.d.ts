import { UserActivationId } from '../../domain/UserActivationId';
import { UserActivationRepository } from '../../domain/UserActivationRepository';
import { ChannelsAvailableGetter } from '../../../channel-user/application/GetChannelsAvailable/ChannelsAvailableGetter';
import { FinderChannelService } from '../../../channel/application/finder/finder-channel.service';
import { InvitationReceivedCanceler } from '../../../invitation/application/CancelReceived/InvitationReceivedCanceler';
import { InvitationSentCanceler } from '../../../invitation/application/CancelSent/InvitationSentCanceler';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { UserActivationToken } from '../../domain/UserActivationToken';
import { ModuleGateway } from '../../../../../apps/dazl/backend/gateways/module.gateway';
type Params = {
    userActivationId: UserActivationId;
    token: UserActivationToken;
};
export declare class UserActivationValidator {
    private readonly repository;
    private readonly eventBus;
    private readonly channelsAvailableGetter;
    private readonly finderChannelService;
    private readonly invitationReceivedCanceler;
    private readonly invitationSentCanceler;
    private readonly moduleGateway;
    private readonly finder;
    constructor(repository: UserActivationRepository, eventBus: EventBus, channelsAvailableGetter: ChannelsAvailableGetter, finderChannelService: FinderChannelService, invitationReceivedCanceler: InvitationReceivedCanceler, invitationSentCanceler: InvitationSentCanceler, moduleGateway: ModuleGateway);
    run(params: Params): Promise<void>;
    private getChannelsAvailable;
}
export {};
