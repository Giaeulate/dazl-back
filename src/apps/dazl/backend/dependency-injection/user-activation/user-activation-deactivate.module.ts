import { Module } from '@nestjs/common';
import { UserActivationDeactivatePostController } from '../../controllers/user-activation-deactivate-post.controller';
import { DeactivateUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/deactivate/deactivate-user-activation.service';
import { CreatorUserActiveHistoryService } from '../../../../../Contexts/Dazl/user-active-history/application/creator/creator-user-active-history.service';
import { DeleteUserPhotosOnDeactivatedUserActivation } from '../../../../../Contexts/Dazl/user_activation/application/Deactive/DeleteUserPhotosOnDeactivatedUserActivation';
import { FinderUserPhotosAll } from '../../../../../Contexts/Dazl/user-photos/application/FinderAll/FinderUserPhotosAll';
import { DeleteUserPhoto } from '../../../../../Contexts/Dazl/user-photos/application/DeletePhoto/DeleteUserPhoto';
import { DesactiveUserActivation } from '../../../../../Contexts/Dazl/user_activation/application/deactivate/DesactiveUserActivation';
import { UpdaterUserActivationLatLng } from '../../../../../Contexts/Dazl/user_activation/application/UpdateLatLng/UpdaterUserActivationLatLng';
import { UserActivationTakeLives } from '../../../../../Contexts/Dazl/user_activation/application/TakeLives/UserActivationTakeLives';
import { UserActivationValidator } from '../../../../../Contexts/Dazl/user_activation/application/ValidateActivation/UserActivationValidator';

@Module({
  controllers: [UserActivationDeactivatePostController],
  providers: [
    DeactivateUserActivationService,
    CreatorUserActiveHistoryService,
    DeleteUserPhotosOnDeactivatedUserActivation,
    DeleteUserPhoto,
    FinderUserPhotosAll,
    DesactiveUserActivation,
    UpdaterUserActivationLatLng,
    UserActivationTakeLives,
    UserActivationValidator,
  ],
})
export class UserActivationDeactivateModule {}
