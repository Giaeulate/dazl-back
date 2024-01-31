import { Module } from '@nestjs/common';
import { EventsActiveByLatLogGetter } from '../../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';
import { GetEventsByLatLogController } from '../../controllers/GetEventsByLatLogController';

@Module({
  imports: [],
  providers: [EventsActiveByLatLogGetter],
  controllers: [GetEventsByLatLogController],
  exports: [],
})
export class EventModule {}
