import { Module } from '@nestjs/common';

import { InvitationController } from '../../controllers/invitation.controller';
import { ChangeStatusInvitationService } from '../../../../../Contexts/Dazl/invitation/application/chance-status/change-status-invitation.service';
import { SendInvitationOnCreatedInvitationService } from '../../../../../Contexts/Dazl/invitation/application/send/send-invitation-on-created-invitation.service';
import { SendNotificationOnChangedInvitationStatus } from '../../../../../Contexts/Dazl/invitation/application/send-notification-invitation-on-chenged-status/send-notification-on-changed-invitation-status';
import { CreateChannelOnChangedInvitationStatus } from '../../../../../Contexts/Dazl/invitation/application/create-channel-on-changed-invitation-status/create-channel-on-changed-invitation-status';
import { ActiveCronReminderOnChannelCreated } from '../../../../../Contexts/Dazl/channel/application/trigger-25-min-cron/ActiveCronReminderOnChannelCreated';
import { ActiveCronDeactivateOnChannelCreated } from '../../../../../Contexts/Dazl/channel/application/trigger-30-min-cron/active-cron-deactivate-on-channel-created';
import { FinderAllInvitationService } from '../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service';
import { SetterCurrentLivesUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/setter-current-lives/setter-current-lives-user-activation.service';
import { CreatorChannelService } from '../../../../../Contexts/Dazl/channel/application/creator/creator-channel.service';
import { CreatorChannelUserService } from '../../../../../Contexts/Dazl/channel-user/application/creator/creator-channel-user.service';

@Module({
  imports: [],
  providers: [
    ChangeStatusInvitationService,
    SendInvitationOnCreatedInvitationService,
    CreateChannelOnChangedInvitationStatus,
    SendNotificationOnChangedInvitationStatus,
    ActiveCronReminderOnChannelCreated,
    ActiveCronDeactivateOnChannelCreated,
    SetterCurrentLivesUserActivationService,
    FinderAllInvitationService,
    CreatorChannelService,
    CreatorChannelUserService,
  ],
  controllers: [InvitationController],
})
export class AcceptedInvitationModule {}
