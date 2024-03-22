"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendInvitationPostModule = void 0;
const common_1 = require("@nestjs/common");
const send_invitation_post_controller_1 = require("../../controllers/send-invitation-post.controller");
const creator_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/creator/creator-invitation.service");
const send_invitation_on_created_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/send/send-invitation-on-created-invitation.service");
const module_gateway_1 = require("../../gateways/module.gateway");
const finder_all_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service");
const setter_current_lives_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/setter-current-lives/setter-current-lives-user-activation.service");
const send_notification_service_1 = require("../../../../../Contexts/Dazl/notification/application/send/send-notification.service");
const InvitationReceivedCanceler_1 = require("../../../../../Contexts/Dazl/invitation/application/CancelReceived/InvitationReceivedCanceler");
const InvitationSentCanceler_1 = require("../../../../../Contexts/Dazl/invitation/application/CancelSent/InvitationSentCanceler");
const change_status_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/chance-status/change-status-invitation.service");
let SendInvitationPostModule = class SendInvitationPostModule {
};
SendInvitationPostModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            creator_invitation_service_1.CreatorInvitationService,
            send_invitation_on_created_invitation_service_1.SendInvitationOnCreatedInvitationService,
            setter_current_lives_user_activation_service_1.SetterCurrentLivesUserActivationService,
            finder_all_invitation_service_1.FinderAllInvitationService,
            send_notification_service_1.SendNotificationService,
            module_gateway_1.ModuleGateway,
            InvitationReceivedCanceler_1.InvitationReceivedCanceler,
            InvitationSentCanceler_1.InvitationSentCanceler,
            change_status_invitation_service_1.ChangeStatusInvitationService,
        ],
        controllers: [send_invitation_post_controller_1.SendInvitationPostController],
    })
], SendInvitationPostModule);
exports.SendInvitationPostModule = SendInvitationPostModule;
//# sourceMappingURL=send-invitation-post.module.js.map