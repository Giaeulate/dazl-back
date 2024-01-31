import { Module } from '@nestjs/common';
import { UserActiveValidationPostController } from '../../controllers/user-active-validation-post.controller';
import { ValidateUserActivation } from '../../../../../Contexts/Dazl/user_activation/application/validate/ValidateUserActivation';

@Module({
  imports: [],
  providers: [ValidateUserActivation],
  controllers: [UserActiveValidationPostController],
})
export class UserActiveValidationModule {}
