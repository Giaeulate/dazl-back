import { Module } from '@nestjs/common';
import { ChancePasswordUserController } from '../../controllers/chance-password-user.controller';
import { ChancePasswordService } from '../../../../../Contexts/Dazl/users/application/chance-password/chance-password-user.service';

@Module({
  controllers: [ChancePasswordUserController],
  providers: [ChancePasswordService],
})
export class ChancePasswordUserModule {}
