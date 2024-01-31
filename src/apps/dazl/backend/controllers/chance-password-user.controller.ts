import { Body, Controller, Post } from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { RequestChancePasswordDto } from '../../../../Contexts/Dazl/users/application/chance-password/dto/RequestChancePasswordDto';
import { ChancePasswordService } from '../../../../Contexts/Dazl/users/application/chance-password/chance-password-user.service';

@Controller('user')
export class ChancePasswordUserController {
  constructor(private readonly chancePasswordService: ChancePasswordService) {}

  @Post('change-password')
  async run(
    @Body() request: RequestChancePasswordDto,
  ): Promise<FormatResponse> {
    return new SuccessfulFormatResponse(
      await this.chancePasswordService.run(request),
    );
  }
}
