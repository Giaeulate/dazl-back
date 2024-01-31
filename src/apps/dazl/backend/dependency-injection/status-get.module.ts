import { Module } from '@nestjs/common';
import { StatusGetController } from '../controllers/status-get.controller';
import { StatusJwtGetController } from '../controllers/status-jwt-get.controller';
import { DesactiveUserController } from '../controllers/DesactiveUserController';

@Module({
  imports: [],
  providers: [],
  controllers: [
    StatusGetController,
    StatusJwtGetController,
    DesactiveUserController,
  ],
})
export class StatusGetModule {}
