import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GetterMessageByChannelService } from '../../../../Contexts/Dazl/channel/application/getter-message/getter-message-by-channel.service';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { ChannelId } from '../../../../Contexts/Dazl/channel/domain/ChannelId';
import { AuthGuard } from '@nestjs/passport';

@Controller('channel')
@UseGuards(AuthGuard('jwt'))
export class MessageByChannelPostController {
  constructor(
    private readonly getterMessageByChannelService: GetterMessageByChannelService, // private readonly getterMessageCronService: GetterMessageCronService,
  ) {}

  @Get(':id/get-messages')
  @HttpCode(HttpStatus.OK)
  async post(@Param('id') channelId: string) {
    return new SuccessfulFormatResponse(
      await this.getterMessageByChannelService.run(new ChannelId(channelId)),
    );
  }
}
