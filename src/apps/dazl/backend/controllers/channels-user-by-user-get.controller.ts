import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { GetterChannelByUserService } from '../../../../Contexts/Dazl/channel-user/application/getter-by-user/getter-channel-by-user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('channel-user')
@UseGuards(AuthGuard('jwt'))
export class ChannelsUserByUserGetController {
  constructor(
    private readonly getterChannelByUserService: GetterChannelByUserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async run(
    @Query('user_activation_id') userActivationId: string,
  ): Promise<FormatResponse> {
    return new SuccessfulFormatResponse(
      await this.getterChannelByUserService.run(userActivationId),
    );
  }
}
