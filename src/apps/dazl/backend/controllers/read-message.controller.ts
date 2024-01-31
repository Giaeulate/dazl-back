import { Controller, Post, Query } from '@nestjs/common';
import { ReadMessageService } from 'src/Contexts/Dazl/message/application/read/read-message.service';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';

@Controller('message/read')
export class ReadMessageController {
  constructor(private readonly readMessageService: ReadMessageService) {}

  @Post()
  async run(
    @Query('user_to_id') userToId: string,
    @Query('channel_id') channelId: string,
  ): Promise<FormatResponse> {
    return new SuccessfulFormatResponse(
      await this.readMessageService.run(userToId, channelId),
    );
  }
}
