import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatorComplaint } from '../../../../Contexts/Dazl/complaint/application/Creator/CreatorComplaint';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { AuthGuard } from '@nestjs/passport';

class PostBody {
  messageId: string;
  complainantId: string;
}

@Controller('complaint')
@UseGuards(AuthGuard('jwt'))
export class PostComplaintController {
  constructor(private readonly creatorComplaint: CreatorComplaint) {}

  @Post()
  async run(@Body() postBody: PostBody) {
    console.log('postBody', postBody);
    return new SuccessfulFormatResponse(
      await this.creatorComplaint.run(postBody),
    );
  }
}
