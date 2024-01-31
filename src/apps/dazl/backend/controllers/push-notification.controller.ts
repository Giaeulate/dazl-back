import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PushNotificationDto } from '../../../../Contexts/Dazl/notification/application/dto/PushNotificationDto';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
import { SuccessfulFormatResponse } from '../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse';
import { AuthGuard } from '@nestjs/passport';

@Controller('push-notification')
export class PushNotificationController {
  constructor() {}

  @Post()
  async sendPushNotification(
    @Body() pushNotificationDto: PushNotificationDto,
  ): Promise<FormatResponse> {
    return new SuccessfulFormatResponse('s');
    // await this.pushNotificationService.sendPushNotification(
    //   pushNotificationDto,
    // ),
  }
}
