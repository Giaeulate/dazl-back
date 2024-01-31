import { Controller, Get, UseGuards } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { FinderActiveUsersWsService } from '../../../../Contexts/Dazl/user_activation/application/fider-active-users/finder-active-users-ws.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-activation')
@UseGuards(AuthGuard('jwt'))
export class ActivatedUsersGetController {
  constructor(
    private readonly finderActiveUsersWsService: FinderActiveUsersWsService,
  ) {}

  @Get(':userId')
  async run(): Promise<FormatResponse> {
    return new SuccessfulFormatResponse('ok');
  }
}
