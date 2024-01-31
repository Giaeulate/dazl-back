import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { DeactivateUserActivationService } from '../../../../Contexts/Dazl/user_activation/application/deactivate/deactivate-user-activation.service';
import { AuthGuard } from '@nestjs/passport';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';

@Controller('user-activation')
@UseGuards(AuthGuard('jwt'))
export class UserActivationDeactivatePostController {
  constructor(
    private readonly deactivateUserActivationService: DeactivateUserActivationService,
  ) {}

  @Post(':id/deactivate')
  async run(@Param('id') idUserActivation: string): Promise<FormatResponse> {
    return new SuccessfulFormatResponse(
      await this.deactivateUserActivationService.run(
        new UserActivationId(idUserActivation),
      ),
    );
  }
}
