import { Controller, Param, Put, Query } from '@nestjs/common';
import { LocatorUpdater } from '../../../../Contexts/Dazl/user_activation/application/UpdateLocator/LocatorUpdater';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { UserActivationIsTheLocatorActivated } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationIsTheLocatorActivated';

class Params {
  id: string;
}
class QueryParams {
  active: number;
}

@Controller('user-activation')
export class PutUserActivationLocator {
  constructor(private readonly updater: LocatorUpdater) {}

  @Put(':id/locator')
  async run(
    @Param() params: Params,
    @Query() queryParams: QueryParams,
  ): Promise<any> {
    const { id } = params;
    const { active } = queryParams;
    console.log('id', id);
    console.log('active', active);
    await this.updater.run({
      id: new UserActivationId(id),
      locator: new UserActivationIsTheLocatorActivated(active),
    });
    return {
      status: true,
      message: 'Locator updated successfully',
      item: {},
    };
  }
}
