import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserCreatorService } from '../../../../Contexts/Dazl/users/application/user-creator/user-creator.service';
import { UserCreatorRequestDto } from '../../../../Contexts/Dazl/users/application/dto/user-creator-request.dto';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';

@Controller('users')
export class UsersPostController {
  private readonly logger = new Logger(UsersPostController.name);

  constructor(private readonly userCreatorService: UserCreatorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() request: UserCreatorRequestDto,
  ): Promise<FormatResponse> {
    this.logger.log('request', request);
    return new SuccessfulFormatResponse(
      await this.userCreatorService.run(request),
      HttpStatus.CREATED,
    );
  }
}
