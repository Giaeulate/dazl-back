import { PushNotificationDto } from '../../../../Contexts/Dazl/notification/application/dto/PushNotificationDto';
import { FormatResponse } from '../../../../Contexts/Shared/domain/response/FormatResponse';
export declare class PushNotificationController {
    constructor();
    sendPushNotification(pushNotificationDto: PushNotificationDto): Promise<FormatResponse>;
}
