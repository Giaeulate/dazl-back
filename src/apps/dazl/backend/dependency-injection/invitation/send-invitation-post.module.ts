import { Module } from '@nestjs/common';
import { SendInvitationPostController } from '../../controllers/send-invitation-post.controller';
import { CreatorInvitationService } from '../../../../../Contexts/Dazl/invitation/application/creator/creator-invitation.service';
import { SendInvitationOnCreatedInvitationService } from '../../../../../Contexts/Dazl/invitation/application/send/send-invitation-on-created-invitation.service';
import { ModuleGateway } from '../../gateways/module.gateway';
import { FinderAllInvitationService } from '../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service';
import { SetterCurrentLivesUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/setter-current-lives/setter-current-lives-user-activation.service';
import { SendNotificationService } from '../../../../../Contexts/Dazl/notification/application/send/send-notification.service';
import { InvitationReceivedCanceler } from '../../../../../Contexts/Dazl/invitation/application/CancelReceived/InvitationReceivedCanceler';
import { InvitationSentCanceler } from '../../../../../Contexts/Dazl/invitation/application/CancelSent/InvitationSentCanceler';
import { ChangeStatusInvitationService } from '../../../../../Contexts/Dazl/invitation/application/chance-status/change-status-invitation.service';

@Module({
  imports: [],
  providers: [
    CreatorInvitationService,
    SendInvitationOnCreatedInvitationService,
    SetterCurrentLivesUserActivationService,
    FinderAllInvitationService,
    SendNotificationService,
    ModuleGateway,
    InvitationReceivedCanceler,
    InvitationSentCanceler,
    ChangeStatusInvitationService,
  ],
  controllers: [SendInvitationPostController],
})
export class SendInvitationPostModule {}
