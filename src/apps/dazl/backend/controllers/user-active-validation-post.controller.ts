import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { UserActivationRequestDto } from '../../../../Contexts/Dazl/user_activation/application/dto/UserActivationRequestDto';
import { ValidateUserActivation } from '../../../../Contexts/Dazl/user_activation/application/validate/ValidateUserActivation';
import { AuthGuard } from '@nestjs/passport';
import { UserActivationDetails } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationDetails';
import { ForbiddenWordAllSearcher } from '../../../../Contexts/Dazl/forbidden_words/application/search-all/ForbiddenWordAllSearcher';

export class HeadersController {
  version_updated: string;
}

@Controller('user-activation/validate')
@UseGuards(AuthGuard('jwt'))
export class UserActiveValidationPostController {
  constructor(
    private readonly validateUserActivation: ValidateUserActivation,
    private readonly forbiddenWordAllSearcher: ForbiddenWordAllSearcher,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async run(
    @Body() request: UserActivationRequestDto,
    @Headers() headers: HeadersController,
  ): Promise<FormatResponse> {
    // if (headers.version_updated !== 'v1') {
    // throw new NotFoundException('Version not found');
    // } else {
    const words = await this.forbiddenWordAllSearcher.search();
    UserActivationDetails.checkForbiddenTerms(
      words.map((value) => value.text.toString()),
      request.details,
    );
    return new SuccessfulFormatResponse(
      await this.validateUserActivation.run(request),
    );
    // }
  }
}
