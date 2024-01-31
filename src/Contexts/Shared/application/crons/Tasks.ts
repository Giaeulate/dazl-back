import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EnsurementDesactiveUserActivation } from '../ensurement-desactive/ensurement-desactive-user-activation';
import { EnsurementDesactiveChat } from '../../../Dazl/channel/application/EnsurementDesactiveChat/EnsurementDesactiveChat';
import { RestartUserActivationLives } from '../../../Dazl/user_activation/application/RestartLives/RestartUserActivationLives';
import { UserLiveActiveExpirated } from '../../../Dazl/user-live/application/active-expirated/UserLiveActiveExpirated';

@Injectable()
export class Tasks {
  private readonly logger = new Logger(Tasks.name);

  constructor(
    private readonly ensurementDesactiveUserActivation: EnsurementDesactiveUserActivation,
    private readonly ensurementDesactiveChat: EnsurementDesactiveChat,
    private readonly userActivationLives: RestartUserActivationLives,
    private readonly activeExpirated: UserLiveActiveExpirated,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCronEnsureActivationUser() {
    this.logger.debug('CronExpression.EVERY_30_MINUTES');
    await this.ensurementDesactiveUserActivation.run();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronEnsureActivationChat() {
    this.logger.debug('CronExpression.EVERY_MINUTE');
    await this.ensurementDesactiveChat.run();
    await this.userActivationLives.run();
    await this.activeExpirated.run();
  }
}
