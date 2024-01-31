import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from '../../../../src/Contexts/Dazl/notification/application/push-notification/push-notification.service';
import { ModuleGateway } from '../../../../src/apps/dazl/backend/gateways/module.gateway';
import { UserId } from '../../../../src/Contexts/Dazl/users/domain/UserId';
import { Uuid } from '../../../../src/Contexts/Shared/domain/value-object/Uuid';

describe('PushNotificationService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService, ModuleGateway],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const token =
      'f55rlH_1TcKUTwGnGhzCzn:APA91bFUrACbqANu9HtjaIa5-4gRM83iL7c5KeunpAcMtc04SpuuBwGpOykloGD0Jzab9ikiM88bgPUowm00bh8eSd01k07_XvoXkQiJY0SlYZ-3Ce3xLyCyTW78JZB0XfBt1ltSL7h0';

    await service.sendPushNotification(new UserId(Uuid.random().value), token, {
      data: { show_in_foreground: 'true' },
      notification: {
        title: 'title',
        body: 'Soy una notificacion',
      },
    });
    console.log('lo envio');
  });
});
