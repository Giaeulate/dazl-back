import { Module } from '@nestjs/common';
import { UserActivationWsGateway } from '../../gateways/user-activation-ws.gateway';
import { AuthUserLoginModule } from '../auth/auth-user-login.module';
import { ActiveUserWsService } from '../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service';
import { CreatorUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/creator/creator-user-activation.service';
import { UserFinderService } from '../../../../../Contexts/Shared/application/user/user-finder.service';
import { FinderActiveUsersWsService } from '../../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service';
import { FileFinderService } from '../../../../../Contexts/Dazl/file/application/finder-file/file-finder.service';
import { GeometricCalculatorService } from '../../../../../Contexts/Dazl/Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { GetterUsersActive } from '../../../../../Contexts/Dazl/user_activation/application/getter-users-active/getter-users-active';
import { GetterActiveUsersWhoInvited } from '../../../../../Contexts/Dazl/user_activation/application/getter-who-invited/getter-active-users-who-invited';
import { FinderAllInvitationService } from '../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service';
import { ActiveCronUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/active-cron/active-cron-user-activation.service';
import { FinderUserActivationByUserActiveService } from '../../../../../Contexts/Dazl/user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service';
import { ManagerUserStateService } from '../../../../../Contexts/Dazl/user_activation/application/manager/manager-user-state.service';
import { UserActivationCreatorOrActivatorService } from '../../../../../Contexts/Dazl/user_activation/application/activator-or-creator/user-activation-creator-or-activator.service';
import { GetterLastUserActiveStillService } from '../../../../../Contexts/Dazl/user_activation/application/getter-last-still-active/getter-last-user-active-still.service';
import { CreatorUserActiveHistoryService } from '../../../../../Contexts/Dazl/user-active-history/application/creator/creator-user-active-history.service';
import { UpdaterUserActiveHistoryService } from '../../../../../Contexts/Dazl/user-active-history/application/updater/updater-user-active-history.service';
import { FinderUserActiveHistoryService } from '../../../../../Contexts/Dazl/user-active-history/application/finder/finder-user-active-history.service';
import { UserVerifierService } from '../../../../../Contexts/Shared/application/user-verifier.service';
import { DesactiveUserActivation } from '../../../../../Contexts/Dazl/user_activation/application/deactivate/DesactiveUserActivation';
import { DesactiveUserActivationTestController } from '../../controllers/DesactiveUserActivationTestController';
import { UpdaterUserActivationLatLngGateway } from '../../gateways/UpdaterUserActivationLatLngGateway';
import { PutUserActivationLocator } from '../../controllers/PutUserActivationLocator';
import { LocatorUpdater } from '../../../../../Contexts/Dazl/user_activation/application/UpdateLocator/LocatorUpdater';
import { SendUserListOnUserActivationLocatorChanged } from '../../../../../Contexts/Dazl/user_activation/application/SendUserList/SendUserListOnUserActivationLocatorChanged';
import { DesactiveUserActivationOnUserDeactivated } from '../../../../../Contexts/Dazl/user_activation/application/DeactiveAll/DesactiveUserActivationOnUserDeactivated';
import { DesactiveUserActivations } from '../../../../../Contexts/Dazl/user_activation/application/DeactiveAll/DesactiveUserActivations';
import { ChangeUserDeletedOnUserDeleted } from '../../../../../Contexts/Dazl/user_activation/application/ChangeUserDeleted/ChangeUserDeletedOnUserDeleted';
import { ChangeUserDeleted } from '../../../../../Contexts/Dazl/user_activation/application/ChangeUserDeleted/ChangeUserDeleted';

@Module({
  imports: [AuthUserLoginModule],
  controllers: [
    DesactiveUserActivationTestController,
    PutUserActivationLocator,
  ],
  providers: [
    UserActivationWsGateway,
    UpdaterUserActivationLatLngGateway,
    ActiveUserWsService,
    CreatorUserActivationService,
    UserFinderService,
    ActiveCronUserActivationService,
    FinderActiveUsersWsService,
    GetterUsersActive,
    UserVerifierService,
    ActiveCronUserActivationService,
    GetterActiveUsersWhoInvited,
    FinderAllInvitationService,
    FileFinderService,
    GeometricCalculatorService,
    FinderUserActivationByUserActiveService,
    UserActivationCreatorOrActivatorService,
    ManagerUserStateService,
    GetterLastUserActiveStillService,
    CreatorUserActiveHistoryService,
    UpdaterUserActiveHistoryService,
    FinderUserActiveHistoryService,
    DesactiveUserActivation,
    LocatorUpdater,
    SendUserListOnUserActivationLocatorChanged,
    DesactiveUserActivationOnUserDeactivated,
    DesactiveUserActivations,
    ChangeUserDeletedOnUserDeleted,
    ChangeUserDeleted,
  ],
  exports: [],
})
export class UserActivationWsModule {}
