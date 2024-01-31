import { Controller, Get, Query } from '@nestjs/common';
import { UserBlockedByUserSearcher } from '../../../../Contexts/Dazl/user-blocked/application/search-by-user/UserBlockedByUserSearcher';

class QueryController {
  user_id: string;
}

@Controller('v1/user-blocked')
export class GetUserBlockedController {
  constructor(
    private readonly blockedByUserSearcher: UserBlockedByUserSearcher,
  ) {}

  @Get('by-user')
  public async run(@Query() body: QueryController): Promise<any> {
    const { user_id } = body;
    const userBlockeds = await this.blockedByUserSearcher.run({
      userId: user_id,
    });
    return {
      status: true,
      message: 'Items encontrados exitosamente',
      items: userBlockeds,
    };
  }
}
