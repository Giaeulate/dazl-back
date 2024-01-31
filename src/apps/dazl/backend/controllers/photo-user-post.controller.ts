import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { UploadUserImageService } from '../../../../Contexts/Dazl/file/application/creator/upload-user-image.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users-activation/file')
// @UseGuards(AuthGuard('jwt'))
export class PhotoUserPostController {
  constructor(
    private readonly uploadUserImageService: UploadUserImageService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
    }),
  )
  async run(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FormatResponse> {
    if (!file) throw new BadRequestException('file is required');
    const photo = await this.uploadUserImageService.run(file, true, true);
    return new SuccessfulFormatResponse(
      photo.thumbnail.toPrimitives(),
      HttpStatus.OK,
    );
  }
}
