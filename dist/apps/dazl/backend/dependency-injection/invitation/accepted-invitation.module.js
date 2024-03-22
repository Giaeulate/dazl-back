"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptedInvitationModule = void 0;
const common_1 = require("@nestjs/common");
const invitation_controller_1 = require("../../controllers/invitation.controller");
const change_status_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/chance-status/change-status-invitation.service");
const send_invitation_on_created_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/send/send-invitation-on-created-invitation.service");
const send_notification_on_changed_invitation_status_1 = require("../../../../../Contexts/Dazl/invitation/application/send-notification-invitation-on-chenged-status/send-notification-on-changed-invitation-status");
const create_channel_on_changed_invitation_status_1 = require("../../../../../Contexts/Dazl/invitation/application/create-channel-on-changed-invitation-status/create-channel-on-changed-invitation-status");
const ActiveCronReminderOnChannelCreated_1 = require("../../../../../Contexts/Dazl/channel/application/trigger-25-min-cron/ActiveCronReminderOnChannelCreated");
const active_cron_deactivate_on_channel_created_1 = require("../../../../../Contexts/Dazl/channel/application/trigger-30-min-cron/active-cron-deactivate-on-channel-created");
const finder_all_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service");
const setter_current_lives_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/setter-current-lives/setter-current-lives-user-activation.service");
const creator_channel_service_1 = require("../../../../../Contexts/Dazl/channel/application/creator/creator-channel.service");
const creator_channel_user_service_1 = require("../../../../../Contexts/Dazl/channel-user/application/creator/creator-channel-user.service");
let AcceptedInvitationModule = class AcceptedInvitationModule {
};
AcceptedInvitationModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            change_status_invitation_service_1.ChangeStatusInvitationService,
            send_invitation_on_created_invitation_service_1.SendInvitationOnCreatedInvitationService,
            create_channel_on_changed_invitation_status_1.CreateChannelOnChangedInvitationStatus,
            send_notification_on_changed_invitation_status_1.SendNotificationOnChangedInvitationStatus,
            ActiveCronReminderOnChannelCreated_1.ActiveCronReminderOnChannelCreated,
            active_cron_deactivate_on_channel_created_1.ActiveCronDeactivateOnChannelCreated,
            setter_current_lives_user_activation_service_1.SetterCurrentLivesUserActivationService,
            finder_all_invitation_service_1.FinderAllInvitationService,
            creator_channel_service_1.CreatorChannelService,
            creator_channel_user_service_1.CreatorChannelUserService,
        ],
        controllers: [invitation_controller_1.InvitationController],
    })
], AcceptedInvitationModule);
exports.AcceptedInvitationModule = AcceptedInvitationModule;
//# sourceMappingURL=accepted-invitation.module.js.map