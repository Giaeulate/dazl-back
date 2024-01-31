import { Module } from '@nestjs/common';
import { UserActiveStatusGetController } from '../../controllers/user-active-status-get.controller';
import { GetterUserActivationStatusService } from '../../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { GetterInvitationReceivedService } from '../../../../../Contexts/Dazl/user_activation/application/getter-receired/getter-invitation-received.service';
import { GetterInvitationSentService } from '../../../../../Contexts/Dazl/user_activation/application/getter-sent/getter-invitation-sent.service';
import { GetterInvitationStatusService } from '../../../../../Contexts/Dazl/user_activation/application/getter-status/getter-invitation-status.service';
import { FinderActiveUsersWsService } from '../../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service';
import { GetterRemainingLivesService } from '../../../../../Contexts/Dazl/user_activation/application/getter-remaining-lives/getter-remaining-lives.service';
import { GeometricCalculatorService } from '../../../../../Contexts/Dazl/Shared/application/calculator-if-within-radius/geometric-calculator.service';
import { GetterUsersActive } from '../../../../../Contexts/Dazl/user_activation/application/getter-users-active/getter-users-active';
import { GetterActiveUsersWhoInvited } from '../../../../../Contexts/Dazl/user_activation/application/getter-who-invited/getter-active-users-who-invited';
import { FinderAllInvitationService } from '../../../../../Contexts/Dazl/invitation/application/find-all/finder-all-invitation.service';
import { FinderUserActivationByUserActiveService } from '../../../../../Contexts/Dazl/user_activation/application/finder-by-user-and-active/finder-user-activation-by-user-active.service';
import { GetUserActivationIdStatus } from '../../controllers/GetUserActivationIdStatus';

@Module({
  imports: [],
  providers: [
    GetterUserActivationStatusService,
    GetterInvitationReceivedService,
    GetterInvitationSentService,
    GetterInvitationStatusService,
    FinderActiveUsersWsService,
    GetterRemainingLivesService,
    FinderAllInvitationService,
    GeometricCalculatorService,
    GetterUsersActive,
    GetterActiveUsersWhoInvited,
    FinderUserActivationByUserActiveService,
  ],
  controllers: [UserActiveStatusGetController, GetUserActivationIdStatus],
})
export class UserActiveStatusGetModule {}
