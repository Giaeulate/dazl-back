import { Module } from '@nestjs/common';
import { RecoverPasswordEmailController } from '../../controllers/recover-password-email.controller';
import { SendCodeEmailRecoverService } from '../../../../../Contexts/Dazl/users/application/send-code-email/send-code-email-recover.service';

@Module({
  imports: [],
  controllers: [RecoverPasswordEmailController],
  providers: [SendCodeEmailRecoverService],
})
export class RecoverPasswordModule {}
