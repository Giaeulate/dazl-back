import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { EventsActiveByLatLogGetter } from '../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';
import { EventLatitude } from '../../../../Contexts/Dazl/Events/domain/EventLatitude';
import { EventLongitude } from '../../../../Contexts/Dazl/Events/domain/EventLongitude';

class GetEventsByLatLogQuery {
  lat: string;
  lng: string;
  distance?: number;
}

@Controller('v1/events')
export class GetEventsByLatLogController {
  constructor(
    private readonly eventsActiveByLatLogGetter: EventsActiveByLatLogGetter,
  ) {}

  @Get('lat-lng')
  @HttpCode(HttpStatus.OK)
  async run(@Query() query: GetEventsByLatLogQuery) {
    const { lat, lng, distance } = query;
    const response = await this.eventsActiveByLatLogGetter.run({
      lat: new EventLatitude(lat),
      log: new EventLongitude(lng),
      distance: distance ? distance : 500,
    });
    return {
      status: true,
      message: 'success',
      item: response,
    };
  }
}
