import { Body, Controller, Post } from '@nestjs/common';
import { UserBlockedBlocker } from '../../../../Contexts/Dazl/user-blocked/application/block/UserBlockedBlocker';
import { Uuid } from '../../../../Contexts/Shared/domain/value-object/Uuid';

class BodyController {
  user_blocked: string;
  user_who_blocked: string;
}

@Controller('v1/user-blocked')
export class PostUserBlockedController {
  constructor(private readonly blocker: UserBlockedBlocker) {}

  @Post()
  public async run(@Body() body: BodyController): Promise<any> {
    console.log(body);
    const { user_blocked, user_who_blocked } = body;
    await this.blocker.run({
      id: Uuid.random().toString(),
      userBlockedId: user_blocked,
      userWhoBlockedId: user_who_blocked,
    });
    return {
      status: true,
      message: 'User blocked',
    };
  }
}
