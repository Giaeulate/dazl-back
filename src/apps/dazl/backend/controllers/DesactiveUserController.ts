import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UpdaterUserService } from '../../../../Contexts/Dazl/users/application/updater/updater-user.service';
import { UserId } from '../../../../Contexts/Dazl/users/domain/UserId';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { AuthGuard } from '@nestjs/passport';

export class DesactiveUserParams {
  userId: string;
}
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class DesactiveUserController {
  constructor(private readonly updaterUserService: UpdaterUserService) {}

  @Put(':userId/desactive')
  async run(@Param() { userId }: DesactiveUserParams) {
    console.log('userId', userId);
    return new SuccessfulFormatResponse(
      await this.updaterUserService.run(new UserId(userId), { active: false }),
    );
  }
}
