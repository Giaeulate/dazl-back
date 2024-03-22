"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const user_finder_service_1 = require("../../../../../Contexts/Shared/application/user/user-finder.service");
const finder_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/finder/finder-invitation.service");
const file_finder_service_1 = require("../../../../../Contexts/Dazl/file/application/finder-file/file-finder.service");
const finder_channel_service_1 = require("../../../../../Contexts/Dazl/channel/application/finder/finder-channel.service");
const send_mail_service_1 = require("../../../../../Contexts/Dazl/Shared/application/mailer/send-mail.service");
const geometric_calculator_service_1 = require("../../../../../Contexts/Dazl/Shared/application/calculator-if-within-radius/geometric-calculator.service");
const creator_file_aws_service_1 = require("../../../../../Contexts/Dazl/file/application/creator-file-aws/creator-file-aws.service");
const finder_all_message_service_1 = require("../../../../../Contexts/Dazl/message/application/finder-all/finder-all-message.service");
const finder_by_message_service_1 = require("../../../../../Contexts/Dazl/message-file/application/finder-by-message/finder-by-message.service");
const module_gateway_1 = require("../../gateways/module.gateway");
const user_activation_is_active_socket_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/is-active-socket/user-activation-is-active-socket.service");
const finder_user_activation_socket_id_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/finder-socket-id/finder-user-activation-socket-id.service");
const user_activation_updater_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/updater/user-activation-updater.service");
const updater_user_service_1 = require("../../../../../Contexts/Dazl/users/application/updater/updater-user.service");
const push_notification_service_1 = require("../../../../../Contexts/Dazl/notification/application/push-notification/push-notification.service");
const updater_channel_1 = require("../../../../../Contexts/Dazl/channel/application/updater/updater-channel");
const finder_message_service_1 = require("../../../../../Contexts/Dazl/message/application/finder/finder-message.service");
const send_notification_service_1 = require("../../../../../Contexts/Dazl/notification/application/send/send-notification.service");
const ImageProcessor_1 = require("../../../../../Contexts/Shared/application/image/ImageProcessor");
const getter_last_user_active_still_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service");
const upload_user_image_service_1 = require("../../../../../Contexts/Dazl/file/application/creator/upload-user-image.service");
const Tasks_1 = require("../../../../../Contexts/Shared/application/crons/Tasks");
const ensurement_desactive_user_activation_1 = require("../../../../../Contexts/Shared/application/ensurement-desactive/ensurement-desactive-user-activation");
const UserActivationFinder_1 = require("../../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder");
const ConvertMessageResponse_1 = require("../../../../../Contexts/Dazl/message/application/ConvertResponse/ConvertMessageResponse");
const FinderUserProfile_1 = require("../../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile");
const FinderUser_1 = require("../../../../../Contexts/Dazl/users/application/Finder/FinderUser");
const UpdaterUserActivationLatLng_1 = require("../../../../../Contexts/Dazl/user_activation/application/UpdateLatLng/UpdaterUserActivationLatLng");
const ChannelsAvailableGetter_1 = require("../../../../../Contexts/Dazl/channel-user/application/GetChannelsAvailable/ChannelsAvailableGetter");
const InvitationReceivedCanceler_1 = require("../../../../../Contexts/Dazl/invitation/application/CancelReceived/InvitationReceivedCanceler");
const InvitationSentCanceler_1 = require("../../../../../Contexts/Dazl/invitation/application/CancelSent/InvitationSentCanceler");
const UserActivationValidator_1 = require("../../../../../Contexts/Dazl/user_activation/application/ValidateActivation/UserActivationValidator");
const AuthRevoke_1 = require("../../../../../Contexts/Dazl/auth/application/revoke/AuthRevoke");
const auth_user_login_module_1 = require("../auth/auth-user-login.module");
const finder_user_activation_by_user_active_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service");
const canceler_channel_1 = require("../../../../../Contexts/Dazl/channel/application/canceler/canceler-channel");
const creator_message_service_1 = require("../../../../../Contexts/Dazl/message/application/create/creator-message.service");
const Rekognition_1 = require("../../../../../Contexts/Dazl/Rekognition/applcation/Rekognition");
const axios_1 = require("@nestjs/axios");
const EnsurementDesactiveChat_1 = require("../../../../../Contexts/Dazl/channel/application/EnsurementDesactiveChat/EnsurementDesactiveChat");
const RestartUserActivationLives_1 = require("../../../../../Contexts/Dazl/user_activation/application/RestartLives/RestartUserActivationLives");
const CityByLatLogGetter_1 = require("../../../../../Contexts/Dazl/City/application/GetByLatLog/CityByLatLogGetter");
const getter_user_activation_status_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service");
const finder_active_users_ws_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service");
const getter_invitation_status_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-status/getter-invitation-status.service");
const getter_invitation_sent_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-sent/getter-invitation-sent.service");
const getter_invitation_received_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-receired/getter-invitation-received.service");
const getter_users_active_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-users-active/getter-users-active");
const finder_all_invitation_service_1 = require("../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service");
const ForbiddenWordAllSearcher_1 = require("../../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher");
const EventCategorySearcher_1 = require("../../../../../Contexts/Dazl/EventCategory/application/search/EventCategorySearcher");
const UserBlockedByUserSearcher_1 = require("../../../../../Contexts/Dazl/user-blocked/application/search-by-user/UserBlockedByUserSearcher");
const UserLiveByUserCreator_1 = require("../../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator");
const UserLiveAllByUserSearcher_1 = require("../../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher");
const UserLiveDesactive_1 = require("../../../../../Contexts/Dazl/user-live/application/desactive/UserLiveDesactive");
const UserLiveActive_1 = require("../../../../../Contexts/Dazl/user-live/application/active/UserLiveActive");
const UserLiveActiveExpirated_1 = require("../../../../../Contexts/Dazl/user-live/application/active-expirated/UserLiveActiveExpirated");
const getter_remaining_lives_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/getter-remaining-lives/getter-remaining-lives.service");
const getter_cron_service_1 = require("../../../../../Contexts/Dazl/channel/application/getter-cron/getter-cron.service");
const UpdateActiveChatSender_1 = require("../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/UpdateActiveChatSender");
const getter_channel_by_user_service_1 = require("../../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service");
const ChannelByUserActivationFinder_1 = require("../../../../../Contexts/Dazl/channel-user/application/FindByUserActivationId/ChannelByUserActivationFinder");
const ChannelUserByChannelFinder_1 = require("../../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder");
const getter_unread_message_service_1 = require("../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service");
const user_activation_creator_or_activator_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service");
const active_user_ws_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service");
const creator_user_activation_service_1 = require("../../../../../Contexts/Dazl/user_activation/application/creator/creator-user-activation.service");
const providers = [
    UpdaterUserActivationLatLng_1.UpdaterUserActivationLatLng,
    user_finder_service_1.UserFinderService,
    finder_invitation_service_1.FinderInvitationService,
    file_finder_service_1.FileFinderService,
    finder_channel_service_1.FinderChannelService,
    send_mail_service_1.SendMailService,
    geometric_calculator_service_1.GeometricCalculatorService,
    creator_file_aws_service_1.CreatorFileAwsService,
    finder_all_message_service_1.FinderAllMessageService,
    finder_by_message_service_1.FinderByMessageService,
    module_gateway_1.ModuleGateway,
    user_activation_is_active_socket_service_1.UserActivationIsActiveSocketService,
    finder_user_activation_socket_id_service_1.FinderUserActivationSocketIdService,
    user_activation_updater_service_1.UserActivationUpdaterService,
    updater_user_service_1.UpdaterUserService,
    push_notification_service_1.NotificationsService,
    updater_channel_1.UpdaterChannel,
    finder_message_service_1.FinderMessageService,
    send_notification_service_1.SendNotificationService,
    ImageProcessor_1.ImageProcessor,
    getter_last_user_active_still_service_1.GetterLastUserActiveStillService,
    upload_user_image_service_1.UploadUserImageService,
    Tasks_1.Tasks,
    ensurement_desactive_user_activation_1.EnsurementDesactiveUserActivation,
    EnsurementDesactiveChat_1.EnsurementDesactiveChat,
    UserActivationFinder_1.UserActivationFinder,
    ConvertMessageResponse_1.ConvertMessageResponse,
    FinderUserProfile_1.FinderUserProfile,
    FinderUser_1.FinderUser,
    ChannelsAvailableGetter_1.ChannelsAvailableGetter,
    InvitationReceivedCanceler_1.InvitationReceivedCanceler,
    InvitationSentCanceler_1.InvitationSentCanceler,
    UserActivationValidator_1.UserActivationValidator,
    AuthRevoke_1.AuthRevoke,
    finder_user_activation_by_user_active_service_1.FinderUserActivationByUserActiveService,
    canceler_channel_1.CancelerChannel,
    creator_message_service_1.CreatorMessageService,
    Rekognition_1.Rekognition,
    RestartUserActivationLives_1.RestartUserActivationLives,
    CityByLatLogGetter_1.CityByLatLogGetter,
    getter_user_activation_status_service_1.GetterUserActivationStatusService,
    finder_active_users_ws_service_1.FinderActiveUsersWsService,
    getter_invitation_status_service_1.GetterInvitationStatusService,
    getter_invitation_sent_service_1.GetterInvitationSentService,
    getter_invitation_received_service_1.GetterInvitationReceivedService,
    getter_users_active_1.GetterUsersActive,
    finder_all_invitation_service_1.FinderAllInvitationService,
    FinderUser_1.FinderUser,
    ForbiddenWordAllSearcher_1.ForbiddenWordAllSearcher,
    EventCategorySearcher_1.EventCategorySearcher,
    UserBlockedByUserSearcher_1.UserBlockedByUserSearcher,
    UserLiveByUserCreator_1.UserLiveByUserCreator,
    UserLiveAllByUserSearcher_1.UserLiveAllByUserSearcher,
    UserLiveDesactive_1.UserLiveDesactive,
    UserLiveActive_1.UserLiveActive,
    UserLiveActiveExpirated_1.UserLiveActiveExpirated,
    getter_remaining_lives_service_1.GetterRemainingLivesService,
    getter_cron_service_1.GetterCronService,
    UpdateActiveChatSender_1.UpdateActiveChatSender,
    getter_channel_by_user_service_1.GetterChannelByUserService,
    ChannelByUserActivationFinder_1.ChannelByUserActivationFinder,
    ChannelUserByChannelFinder_1.ChannelUserByChannelFinder,
    getter_unread_message_service_1.GetterUnreadMessageService,
    user_activation_creator_or_activator_service_1.UserActivationCreatorOrActivatorService,
    active_user_ws_service_1.ActiveUserWsService,
    creator_user_activation_service_1.CreatorUserActivationService,
];
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            auth_user_login_module_1.AuthUserLoginModule,
            axios_1.HttpModule.register({
                timeout: 5000,
                maxRedirects: 5,
            }),
        ],
        providers: [...providers],
        exports: [...providers],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map