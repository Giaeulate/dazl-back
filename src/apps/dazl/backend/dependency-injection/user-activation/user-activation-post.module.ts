import { Module } from '@nestjs/common';
import { UserFinderService } from '../../../../../Contexts/Shared/application/user/user-finder.service';
import {
  EVENT_BUS_OBJECT,
  USER_ACTIVATION_REPOSITORY_OBJECT,
  USER_REPOSITORY_OBJECT,
} from '../constants';
import { UserActivationWsGateway } from '../../gateways/user-activation-ws.gateway';
import { ActiveUserWsService } from '../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service';
import { AuthUserLoginModule } from '../auth/auth-user-login.module';
import { CreatorUserActivationService } from '../../../../../Contexts/Dazl/user_activation/application/creator/creator-user-activation.service';

@Module({
  imports: [AuthUserLoginModule],
  providers: [
    CreatorUserActivationService,
    UserFinderService,
    USER_ACTIVATION_REPOSITORY_OBJECT,
    USER_REPOSITORY_OBJECT,
    EVENT_BUS_OBJECT,
    UserActivationWsGateway,
    ActiveUserWsService,
  ],
})
export class UserActivationPostModule {}
