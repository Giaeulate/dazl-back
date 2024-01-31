import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers';
import { Express } from 'express';
import { MessageDto } from '../../../../Contexts/Dazl/message/domain/dto/request/MessageDto';
import { SendPhotoMessageService } from '../../../../Contexts/Dazl/message/application/send-photo/send-photo-message.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('message')
@UseGuards(AuthGuard('jwt'))
export class SendPhotoMessageController {
  constructor(
    private readonly sendPhotoMessageService: SendPhotoMessageService,
  ) {}

  @Post('send-photo')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
    }),
  )
  async run(
    @UploadedFile() file: Express.Multer.File,
    @Body() request: MessageDto,
  ): Promise<FormatResponse> {
    console.log('file', file);
    if (!file) throw new BadRequestException('file is required');
    return new SuccessfulFormatResponse(
      await this.sendPhotoMessageService.run(file, request),
      HttpStatus.CREATED,
    );
  }
}
