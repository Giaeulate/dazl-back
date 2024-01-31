import { Controller, Param, Put } from '@nestjs/common';
import { UserBlockedUnblocker } from '../../../../Contexts/Dazl/user-blocked/application/unblock/UserBlockedUnblocker';

class ParamsController {
  id: string;
}

@Controller('v1/user-blocked')
export class PutUserBlockedController {
  constructor(private readonly unblocker: UserBlockedUnblocker) {}

  @Put(':id')
  public async run(@Param() params: ParamsController): Promise<any> {
    console.log(params);
    const { id } = params;
    await this.unblocker.run({ id });
    return {
      status: true,
      message: 'User unblocked',
    };
  }
}
