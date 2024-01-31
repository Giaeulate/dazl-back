import { Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { DesactiveUserActivation } from '../../../../Contexts/Dazl/user_activation/application/deactivate/DesactiveUserActivation';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';

@Controller('test/user-activation')
export class DesactiveUserActivationTestController {
  constructor(
    private readonly desactiveUserActivation: DesactiveUserActivation,
    private readonly finderUserActivationService: UserActivationFinder,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Patch(':id/desactive')
  async run(@Param('id') idUserActivation: string) {
    const userActivation = await this.finderUserActivationService.run(
      new UserActivationId(idUserActivation),
    );
    await this.desactiveUserActivation.run({ userActivation });
  }
}
