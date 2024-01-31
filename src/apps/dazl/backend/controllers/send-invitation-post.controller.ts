import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatorInvitationService } from '../../../../Contexts/Dazl/invitation/application/creator/creator-invitation.service';
import { AuthGuard } from '@nestjs/passport';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';

@Controller('invitation/send')
@UseGuards(AuthGuard('jwt'))
export class SendInvitationPostController {
  constructor(
    private readonly creatorInvitationService: CreatorInvitationService,
    private readonly userActivationFinder: UserActivationFinder,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async run(
    @Query('user_activation_to') userTo: string,
    @Query('user_activation_from') userFrom: string,
  ): Promise<unknown> {
    const userActivation = await this.userActivationFinder.run(
      new UserActivationId(userFrom),
    );

    await this.creatorInvitationService.run(userTo, userFrom);
    return await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
  }
}
