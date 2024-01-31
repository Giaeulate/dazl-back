import { Module } from '@nestjs/common';
import { ActiveUserWsService } from '../../../../../Contexts/Dazl/user_activation/application/active-user/active-user-ws.service';
import { AuthUserLoginModule } from '../auth/auth-user-login.module';

@Module({
  imports: [AuthUserLoginModule],
  providers: [ActiveUserWsService],
  controllers: [],
})
export class UsersActivationGetModule {}
