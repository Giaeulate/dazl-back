import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserReportCreator } from '../../../../Contexts/Dazl/UserReports/application/create/UserReportCreator';
import { UserId } from '../../../../Contexts/Dazl/users/domain/UserId';
import { UserReportReason } from '../../../../Contexts/Dazl/UserReports/domain/UserReportReason';
import { AuthGuard } from '@nestjs/passport';

class BodyPutUsersReportController {
  reason: string;
  user_who_reported: string;
}

class ParamsPutUsersReportController {
  id: string;
}

@Controller('v1/users')
@UseGuards(AuthGuard('jwt'))
export class PutUsersReportController {
  constructor(private readonly userReportCreator: UserReportCreator) {}

  @Put(':id/report')
  @HttpCode(HttpStatus.OK)
  async run(
    @Body() body: BodyPutUsersReportController,
    @Param() params: ParamsPutUsersReportController,
  ) {
    await this.userReportCreator.run({
      userWhoReportedId: new UserId(body.user_who_reported),
      userWhoWasReportedId: new UserId(params.id),
      reason: new UserReportReason(body.reason),
    });

    return {
      status: true,
      message: 'Operacion Exitosa',
    };
  }
}
