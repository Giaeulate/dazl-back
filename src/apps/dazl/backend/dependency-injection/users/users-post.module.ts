import { Module } from '@nestjs/common';
import { UsersPostController } from '../../controllers/users-post.controller';
import { UserCreatorService } from '../../../../../Contexts/Dazl/users/application/user-creator/user-creator.service';
import { GetUserIdController } from '../../controllers/GetUserIdController';
import { FinderUserProfile } from '../../../../../Contexts/Dazl/users/application/FinderProfile/FinderUserProfile';
import { PutUserIdController } from '../../controllers/PutUserIdController';
import { CreatorExternalUserPhoto } from '../../../../../Contexts/Dazl/user-photos/application/CreatorExternal/CreatorExternalUserPhoto';
import { CreatorUserPhoto } from '../../../../../Contexts/Dazl/user-photos/application/Creator/CreatorUserPhoto';
import { DeleteUserPhoto } from '../../../../../Contexts/Dazl/user-photos/application/DeletePhoto/DeleteUserPhoto';
import { DeletePhotoUserController } from '../../controllers/DeletePhotoUserController';
import { UpdaterPhotoUserActivation } from '../../../../../Contexts/Dazl/user_activation/application/updater-photo/updater-photo-user-activation';
import { GetByPassController } from '../../controllers/GetByPassController';
import { PutUserBadgeResetController } from '../../controllers/PutUserBadgeResetController';
import { UserResetBadge } from '../../../../../Contexts/Dazl/users/application/ResetBadge/UserResetBadge';
import { GetUserActiveLatLogController } from '../../controllers/GetUserActiveLatLogController';
import { UserActivationLatLogGetter } from '../../../../../Contexts/Dazl/user_activation/application/GetLatLog/UserActivationLatLogGetter';
import { PutUserActiveEmailController } from '../../controllers/PutUserActiveEmailController';
import { UserConfirmEmailActivator } from '../../../../../Contexts/Dazl/users/application/confirm-email/UserConfirmEmailActivator';
import { SendUserActiveEmailOnUserCreated } from '../../../../../Contexts/Dazl/users/application/send-confirm-email/SendUserActiveEmailOnUserCreated';
import { UserActiveEmailSender } from '../../../../../Contexts/Dazl/users/application/send-confirm-email/UserActiveEmailSender';
import { UserResendEmailController } from '../../controllers/UserResendEmailController';
import { SendUserActiveByEmail } from '../../../../../Contexts/Dazl/users/application/send-confirm-email/SendUserActiveByEmail';
import { PostActivationController } from '../../controllers/PostActivationController';
import { AuthUserLoginModule } from '../auth/auth-user-login.module';
import { EventsActiveByLatLogGetter } from 'src/Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';

@Module({
  providers: [
    UserCreatorService,
    FinderUserProfile,
    CreatorExternalUserPhoto,
    CreatorUserPhoto,
    DeleteUserPhoto,
    UpdaterPhotoUserActivation,
    UserResetBadge,
    UserActivationLatLogGetter,
    UserConfirmEmailActivator,
    SendUserActiveEmailOnUserCreated,
    UserActiveEmailSender,
    SendUserActiveByEmail,
    EventsActiveByLatLogGetter,
  ],
  controllers: [
    UsersPostController,
    GetUserIdController,
    PutUserIdController,
    DeletePhotoUserController,
    GetByPassController,
    PutUserBadgeResetController,
    GetUserActiveLatLogController,
    PutUserActiveEmailController,
    UserResendEmailController,
    PostActivationController,
  ],
  imports: [AuthUserLoginModule],
})
export class UsersPostModule {}
