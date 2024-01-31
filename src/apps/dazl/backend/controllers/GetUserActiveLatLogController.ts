import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UserActivationLatLogGetter } from '../../../../Contexts/Dazl/user_activation/application/GetLatLog/UserActivationLatLogGetter';
import { UserActivationLatitude } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationLatitude';
import { UserActivationLongitude } from '../../../../Contexts/Dazl/user_activation/domain/UserActivationLongitude';
import { EventsActiveByLatLogGetter } from 'src/Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter';
import { EventLatitude } from 'src/Contexts/Dazl/Events/domain/EventLatitude';

class GetUserActiveLatLogQuery {
  readonly lat: number;
  readonly log: number;
  readonly distance: number;
  readonly male: string;
  readonly female: string;
  readonly lgtb: string;
  readonly upper_age: number;
  readonly lower_age: number;
  readonly city_id: string;
  readonly date_upper: string;
  readonly date_lower: string;
}

@Controller('v1/user-activation')
export class GetUserActiveLatLogController {
  constructor(
    private readonly activationLatLogGetter: UserActivationLatLogGetter,
    private readonly eventsActiveByLatLogGetter: EventsActiveByLatLogGetter,
  ) {}

  @Get('maps')
  @HttpCode(HttpStatus.OK)
  async run(@Query() queries: GetUserActiveLatLogQuery) {
    console.log('GetUserActiveLatLogController', queries);

    const lat = queries.lat;
    const log = queries.log;
    const distance = queries.distance;

    const eventsData = await this.eventsActiveByLatLogGetter.run({
      lat: new EventLatitude(lat.toString()),
      log: new EventLatitude(log.toString()),
      distance: distance,
    });

    const response = await this.activationLatLogGetter.run({
      latitude: new UserActivationLatitude(String(lat)),
      longitude: new UserActivationLongitude(String(log)),
      distance: Number(distance),
      male: queries.male === '1' ? 1 : queries.male === '0' ? 0 : null,
      female: queries.female === '1' ? 1 : queries.female === '0' ? 0 : null,
      lgtb: queries.lgtb === '1' ? 1 : queries.lgtb === '0' ? 0 : null,
      ageUpperFilter: queries.upper_age ? queries.upper_age : 0,
      ageLowerFilter: queries.lower_age ? queries.lower_age : 0,
      date_upper: queries.date_upper ? queries.date_upper : null,
      date_lower: queries.date_lower ? queries.date_lower : null,
    });
    console.log('123');
    return {
      status: true,
      message: 'User active',
      items: response,
      events: eventsData,
    };
  }
}
