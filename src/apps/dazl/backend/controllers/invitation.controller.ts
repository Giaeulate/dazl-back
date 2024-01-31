import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ChangeStatusInvitationService } from '../../../../Contexts/Dazl/invitation/application/chance-status/change-status-invitation.service';
import { InvitationStatusEnum } from '../../../../Contexts/Dazl/invitation/domain/InvitationStatus';
import { GetterUserActivationStatusService } from '../../../../Contexts/Dazl/user_activation/application/getter-current-status/getter-user-activation-status.service';
import { UserActivationFinder } from '../../../../Contexts/Dazl/user_activation/application/finder/UserActivationFinder';
import { UserActivationId } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationId';

class QueryParamsGetUserActivationIdStatus {
  user_activation_id: string;
}

@Controller('invitation')
export class InvitationController {
  constructor(
    private readonly acceptInvitationService: ChangeStatusInvitationService,
    private readonly getterUserActivationStatusService: GetterUserActivationStatusService,
    private readonly userActivationFinder: UserActivationFinder,
  ) {}

  @Post(':invitationId/accepted')
  @HttpCode(HttpStatus.OK)
  async runAccepted(
    @Param('invitationId') invitationId: string,
    @Query() { user_activation_id }: QueryParamsGetUserActivationIdStatus,
  ): Promise<unknown> {
    const userActivation = await this.userActivationFinder.run(
      new UserActivationId(user_activation_id),
    );
    await this.acceptInvitationService.run(
      invitationId,
      InvitationStatusEnum.ACCEPTED,
    );
    return await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
  }

  @Post(':invitationId/rejected')
  @HttpCode(HttpStatus.OK)
  async runRejected(
    @Param('invitationId') invitationId: string,
    @Query() { user_activation_id }: QueryParamsGetUserActivationIdStatus,
  ): Promise<unknown> {
    const userActivation = await this.userActivationFinder.run(
      new UserActivationId(user_activation_id),
    );

    await this.acceptInvitationService.run(
      invitationId,
      InvitationStatusEnum.REJECTED,
    );

    return await this.getterUserActivationStatusService.run(
      userActivation.id.value,
      {
        lowerAge: userActivation.ageLowerFilter,
        upperAge: userActivation.ageUpperFilter,
        distance: userActivation.distanceFilter,
      },
    );
  }

  @Post(':invitationId/cancel')
  @HttpCode(HttpStatus.OK)
  async runCancel(
    @Param('invitationId') invitationId: string,
    @Query() { user_activation_id }: QueryParamsGetUserActivationIdStatus,
  ): Promise<unknown> {
    const userActivation = await this.userActivationFinder.run(
      new UserActivationId(user_activation_id),
    );
    await this.acceptInvitationService.run(
      invitationId,
      InvitationStatusEnum.CANCEL,
    );
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
