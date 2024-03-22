import { InvitationStatusAcceptedChangedDomainEvent } from '../../domain/InvitationStatusAcceptedChangedDomainEvent';
import { CreatorChannelService } from '../../../channel/application/creator/creator-channel.service';
import { CreatorChannelUserService } from '../../../channel-user/application/creator/creator-channel-user.service';
import { EventBus } from '../../../../Shared/domain/bus/event/EventBus';
import { CreatorMessageService } from '../../../message/application/create/creator-message.service';
import { UserActivationFinder } from '../../../user_activation/application/finder/UserActivationFinder';
import { UpdateActiveChatSender } from '../../../channel-user/application/SendUpdatedActiveChat/UpdateActiveChatSender';
export declare class CreateChannelOnChangedInvitationStatus {
    private readonly creatorChannelService;
    private readonly creatorChannelUserService;
    private readonly creatorMessageService;
    private readonly finderUserActivationService;
    private readonly updateActiveChatSender;
    private readonly eventBus;
    constructor(creatorChannelService: CreatorChannelService, creatorChannelUserService: CreatorChannelUserService, creatorMessageService: CreatorMessageService, finderUserActivationService: UserActivationFinder, updateActiveChatSender: UpdateActiveChatSender, eventBus: EventBus);
    on(event: InvitationStatusAcceptedChangedDomainEvent): Promise<void>;
}
