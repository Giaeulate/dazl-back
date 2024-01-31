import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { AuthGuard } from '@nestjs/passport';
import { UserActivationAgeUpperFilter } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeUpperFilter';
import { UserActivationDistanceFilter } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationDistanceFilter';
import { UserActivationAgeLowerFilter } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeLowerFilter';

@Controller('user-activation/status')
@UseGuards(AuthGuard('jwt'))
export class UserActiveStatusGetController {
  constructor(
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
  ) {}

  @Get()
  async run(
    @Query('user_activation_id') userActivationId: string,
  ): Promise<FormatResponse> {
    return new SuccessfulFormatResponse(
      await this.getterUserActivationStatusService.run(userActivationId, {
        lowerAge: new UserActivationAgeLowerFilter(0),
        upperAge: new UserActivationAgeUpperFilter(0),
        distance: new UserActivationDistanceFilter(0),
      }),
    );
  }
}
