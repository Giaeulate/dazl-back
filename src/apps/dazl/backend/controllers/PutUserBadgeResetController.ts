import { Controller, Param, Put } from '@nestjs/common';
import { UserResetBadge } from '../../../../Contexts/Dazl/users/application/ResetBadge/UserResetBadge';
import { UserTokenFirebase } from '../../../../Contexts/Dazl/users/domain/UserTokenFirebase';

@Controller('v1/user')
export class PutUserBadgeResetController {
  constructor(private readonly userResetBadge: UserResetBadge) {}

  @Put(':token/badge/reset')
  async run(@Param('token') token: string) {
    await this.userResetBadge.run(new UserTokenFirebase(token));
    return {
      status: true,
      message: 'Badge reset',
    };
  }
}
