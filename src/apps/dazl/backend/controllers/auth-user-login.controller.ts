import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserLoginRequestDto } from '../../../../Contexts/Dazl/auth/application/dto/user-login-request.dto';
import { AuthUserLoginService } from '../../../../Contexts/Dazl/auth/application/UserLogin/auth-user-login.service';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';

@Controller('auth/login')
export class AuthUserLoginController {
  private readonly logger = new Logger(AuthUserLoginController.name);

  constructor(private readonly authUserLoginService: AuthUserLoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async run(@Body() request: UserLoginRequestDto): Promise<FormatResponse> {
    this.logger.log('request', request);
    const response = await this.authUserLoginService.run(request);
    delete response.token;
    return new SuccessfulFormatResponse(response, HttpStatus.OK);
  }

  @Post('/activation')
  @HttpCode(HttpStatus.OK)
  async runActivation(
    @Body() request: UserLoginRequestDto,
  ): Promise<FormatResponse> {
    this.logger.log('request', request);
    return new SuccessfulFormatResponse(
      await this.authUserLoginService.run(request),
      HttpStatus.OK,
    );
  }
}
