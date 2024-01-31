import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';

@Controller('status-jwt')
export class StatusJwtGetController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async run(): Promise<FormatResponse> {
    return new SuccessfulFormatResponse('OK');
  }
}
