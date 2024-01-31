import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { UserActivationAgeLowerFilter } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeLowerFilter';
import { UserActivationAgeUpperFilter } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationAgeUpperFilter';
import { UserActivationDistanceFilter } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationDistanceFilter';

class ParamsGetUserActivationIdStatus {
  id: string;
}

class QueryParamsGetUserActivationIdStatus {
  upper_age: number;
  lower_age: number;
  distance: number;
}

@Controller('v1/user-activation')
@UseGuards(AuthGuard('jwt'))
export class GetUserActivationIdStatus {
  constructor(
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
  ) {}

  @Get(':id/status')
  async run(
    @Param() params: ParamsGetUserActivationIdStatus,
    @Query() queries: QueryParamsGetUserActivationIdStatus,
  ) {
    console.log('params', params);
    console.log('queries', queries);
    console.log(typeof queries.lower_age);
    return new SuccessfulFormatResponse(
      await this.getterUserActivationStatusService.run(params.id, {
        lowerAge: queries.lower_age
          ? new UserActivationAgeLowerFilter(Number(queries.lower_age))
          : null,
        upperAge: queries.upper_age
          ? new UserActivationAgeUpperFilter(Number(queries.upper_age))
          : null,
        distance: queries.distance
          ? new UserActivationDistanceFilter(Number(queries.distance))
          : null,
      }),
    );
  }
}
