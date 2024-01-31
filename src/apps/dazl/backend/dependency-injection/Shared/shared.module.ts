import { Global, Module } from '@nestjs/common';
import { UserFinderService } from '../../../../../Contexts/Shared/application/user/user-finder.service';
import { FinderInvitationService } from '../../../../../Contexts/Dazl/invitation/application/finder/finder-invitation.service';
import { FileFinderService } from '../../../../../Contexts/Dazl/file/application/finder-file/file-finder.service';
import { FinderChannelService } from '../../../../../Contexts/Dazl/channel/application/finder/finder-channel.service';
import { SendMailService } from '../../../../../Contexts/Dazl/Shared/application/mailer/send-mail.service';
import { GeometricCalculatorService } from '../../../../../Contexts/Dazl/Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { CreatorFileAwsService } from '../../../../../Contexts/Dazl/file/application/creator-file-aws/creator-file-aws.service';
import { FinderAllMessageService } from '../../../../../Contexts/Dazl/message/application/finder-all/finder-all-message.service';
import { FinderByMessageService } from '../../../../../Contexts/Dazl/message-file/application/finder-by-message/finder-by-message.service';
import { ModuleGateway } from '../../gateways/module.gateway';
import { UserActivationIsActiveSocketService } from '../../../../../Contexts/Dazl/user_activation/application/is-active-socket/user-activation-is-active-socket.service';
import { FinderUserActivationSocketIdService } from '../../../../../Contexts/Dazl/user_activation/application/finder-socket-id/finder-user-activation-socket-id.service';
import { UserActivationUpdaterService } from '../../../../../Contexts/Dazl/user_activation/application/updater/user-activation-updater.service';
import { UpdaterUserService } from '../../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { NotificationsService } from '../../../../../Contexts/Dazl/notification/application/push-notification/push-notification.service';
import { UpdaterChannel } from '../../../../../Contexts/Dazl/channel/application/updater/updater-channel';
import { FinderMessageService } from '../../../../../Contexts/Dazl/message/application/finder/finder-message.service';
import { SendNotificationService } from '../../../../../Contexts/Dazl/notification/application/send/send-notification.service';
import { ImageProcessor } from '../../../../../Contexts/Shared/application/image/ImageProcessor';
import { GetterLastUserActiveStillService } from '../../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { UploadUserImageService } from '../../../../../Contexts/Dazl/file/application/creator/upload-user-image.service';
import { Tasks } from '../../../../../Contexts/Shared/application/crons/Tasks';
import { EnsurementDesactiveUserActivation } from '../../../../../Contexts/Shared/application/ensurement-desactive/ensurement-desactive-user-activation';
import { UserActivationFinder } from '../../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { ConvertMessageResponse } from '../../../../../Contexts/Dazl/message/application/ConvertResponse/ConvertMessageResponse';
import { FinderUserProfile } from '../../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
import { FinderUser } from '../../../../../Contexts/Dazl/users/application/Finder/FinderUser';
import { UpdaterUserActivationLatLng } from '../../../../../Contexts/Dazl/user_activation/application/UpdateLatLng/UpdaterUserActivationLatLng';
import { ChannelsAvailableGetter } from '../../../../../Contexts/Dazl/channel-user/application/GetChannelsAvailable/ChannelsAvailableGetter';
import { InvitationReceivedCanceler } from '../../../../../Contexts/Dazl/invitation/application/CancelReceived/InvitationReceivedCanceler';
import { InvitationSentCanceler } from '../../../../../Contexts/Dazl/invitation/application/CancelSent/InvitationSentCanceler';
import { UserActivationValidator } from '../../../../../Contexts/Dazl/user_activation/application/ValidateActivation/UserActivationValidator';
import { AuthRevoke } from '../../../../../Contexts/Dazl/auth/application/revoke/AuthRevoke';
import { AuthUserLoginModule } from '../auth/auth-user-login.module';
import { FinderUserActivationByUserActiveService } from '../../../../../Contexts/Dazl/user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service';
import { CancelerChannel } from '../../../../../Contexts/Dazl/channel/application/canceler/canceler-channel';
import { CreatorMessageService } from '../../../../../Contexts/Dazl/message/application/create/creator-message.service';
import { Rekognition } from '../../../../../Contexts/Dazl/Rekognition/applcation/Rekognition';
import { HttpModule } from '@nestjs/axios';
import { EnsurementDesactiveChat } from '../../../../../Contexts/Dazl/channel/application/EnsurementDesactiveChat/EnsurementDesactiveChat';
import { RestartUserActivationLives } from '../../../../../Contexts/Dazl/user_activation/application/RestartLives/RestartUserActivationLives';
import { CityByLatLogGetter } from '../../../../../Contexts/Dazl/City/application/GetByLatLog/CityByLatLogGetter';
import { GetterUserActivationStatusService } from '../../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { FinderActiveUsersWsService } from '../../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service';
import { GetterInvitationStatusService } from '../../../../../Contexts/Dazl/user_activation/application/getter-status/getter-invitation-status.service';
import { GetterInvitationSentService } from '../../../../../Contexts/Dazl/user_activation/application/getter-sent/getter-invitation-sent.service';
import { GetterInvitationReceivedService } from '../../../../../Contexts/Dazl/user_activation/application/getter-receired/getter-invitation-received.service';
import { GetterUsersActive } from '../../../../../Contexts/Dazl/user_activation/application/getter-users-active/getter-users-active';
import { FinderAllInvitationService } from '../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service';
import { ForbiddenWordAllSearcher } from '../../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher';
import { EventCategorySearcher } from '../../../../../Contexts/Dazl/EventCategory/application/search/EventCategorySearcher';
import { UserBlockedByUserSearcher } from '../../../../../Contexts/Dazl/user-blocked/application/search-by-user/UserBlockedByUserSearcher';
import { UserLiveByUserCreator } from '../../../../../Contexts/Dazl/user-live/application/create-by-user/UserLiveByUserCreator';
import { UserLiveAllByUserSearcher } from '../../../../../Contexts/Dazl/user-live/application/search-all-by-user/UserLiveAllByUserSearcher';
import { UserLiveDesactive } from '../../../../../Contexts/Dazl/user-live/application/desactive/UserLiveDesactive';
import { UserLiveActive } from '../../../../../Contexts/Dazl/user-live/application/active/UserLiveActive';
import { UserLiveActiveExpirated } from '../../../../../Contexts/Dazl/user-live/application/active-expirated/UserLiveActiveExpirated';
import { GetterRemainingLivesService } from '../../../../../Contexts/Dazl/user_activation/application/getter-remaining-lives/getter-remaining-lives.service';
import { GetterCronService } from '../../../../../Contexts/Dazl/channel/application/getter-cron/getter-cron.service';
import { UpdateActiveChatSender } from '../../../../../Contexts/Dazl/channel-user/application/SendUpdatedActiveChat/UpdateActiveChatSender';
import { GetterChannelByUserService } from '../../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { ChannelByUserActivationFinder } from '../../../../../Contexts/Dazl/channel-user/application/FindByUserActivationId/ChannelByUserActivationFinder';
import { ChannelUserByChannelFinder } from '../../../../../Contexts/Dazl/channel-user/application/FindByChannel/ChannelUserByChannelFinder';
import { GetterUnreadMessageService } from '../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service';
import { UserActivationCreatorOrActivatorService } from '../../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { ActiveUserWsService } from '../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service';
import { CreatorUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/creator/creator-user-activation.service';

const providers = [
  UpdaterUserActivationLatLng,
  UserFinderService,
  FinderInvitationService,
  FileFinderService,
  FinderChannelService,
  SendMailService,
  GeometricCalculatorService,
  CreatorFileAwsService,
  FinderAllMessageService,
  FinderByMessageService,
  ModuleGateway,
  UserActivationIsActiveSocketService,
  FinderUserActivationSocketIdService,
  UserActivationUpdaterService,
  UpdaterUserService,
  NotificationsService,
  UpdaterChannel,
  FinderMessageService,
  SendNotificationService,
  ImageProcessor,
  GetterLastUserActiveStillService,
  UploadUserImageService,
  Tasks,
  EnsurementDesactiveUserActivation,
  EnsurementDesactiveChat,
  UserActivationFinder,
  ConvertMessageResponse,
  FinderUserProfile,
  FinderUser,
  ChannelsAvailableGetter,
  InvitationReceivedCanceler,
  InvitationSentCanceler,
  UserActivationValidator,
  AuthRevoke,
  FinderUserActivationByUserActiveService,
  CancelerChannel,
  CreatorMessageService,
  Rekognition,
  RestartUserActivationLives,
  CityByLatLogGetter,
  GetterUserActivationStatusService,
  FinderActiveUsersWsService,
  GetterInvitationStatusService,
  GetterInvitationSentService,
  GetterInvitationReceivedService,
  GetterUsersActive,
  FinderAllInvitationService,
  FinderUser,
  ForbiddenWordAllSearcher,
  EventCategorySearcher,
  UserBlockedByUserSearcher,
  UserLiveByUserCreator,
  UserLiveAllByUserSearcher,
  UserLiveDesactive,
  UserLiveActive,
  UserLiveActiveExpirated,
  GetterRemainingLivesService,
  GetterCronService,
  UpdateActiveChatSender,
  GetterChannelByUserService,
  ChannelByUserActivationFinder,
  ChannelUserByChannelFinder,
  GetterUnreadMessageService,
  UserActivationCreatorOrActivatorService,
  ActiveUserWsService,
  CreatorUserActivationService,
];

@Global()
@Module({
  imports: [
    AuthUserLoginModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
