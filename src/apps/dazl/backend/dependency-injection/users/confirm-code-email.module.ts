import { Module } from '@nestjs/common';
import { ConfirmCodeEmailController } from '../../controllers/confirm-code-email.controller';
import { ConfirmCodeUserService } from '../../../../../Contexts/Dazl/users/application/confirm-code/confirm-code-user.service';

@Module({
  providers: [ConfirmCodeUserService],
  controllers: [ConfirmCodeEmailController],
})
export class ConfirmCodeEmailModule {}
