import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { EventRepository } from '../../domain/EventRepository';
import { EventLatitude } from '../../domain/EventLatitude';
import { EventLongitude } from '../../domain/EventLongitude';
import { CityByLatLogGetter } from '../../../City/application/GetByLatLog/CityByLatLogGetter';
import { CityLatitude } from '../../../City/domain/CityLatitude';
import { CityLongitude } from '../../../City/domain/CityLongitude';
import { EventCategorySearcher } from '../../../EventCategory/application/search/EventCategorySearcher';
import { GeometricCalculatorService } from '../../../Shared/application/calculator-if-within-radius/geometric-calculator.service';

type Params = {
  lat: EventLatitude;
  log: EventLongitude;
  distance?: number;
};

@Injectable()
export class EventsActiveByLatLogGetter {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
    private readonly cityByLatLogGetter: CityByLatLogGetter,
    private readonly eventCategorySearcher: EventCategorySearcher,
    private readonly geometricCalculatorService: GeometricCalculatorService,
  ) { }

  async run({ lat, log, distance }: Params) {
    const city = await this.cityByLatLogGetter.run({
      lat: new CityLatitude(lat.value),
      log: new CityLongitude(log.value),
    });

    const eventsAll = await this.eventRepository.searchActive();

    const categoryAll = await this.eventCategorySearcher.getAll();

    const eventsPromise = eventsAll
      .filter((event) => event.cityId.equals(city.id))
      .filter((event) =>
        this.geometricCalculatorService.isInsideRadio(
          Number.parseFloat(event.latitude.value),
          Number.parseFloat(event.longitude.value),
          Number.parseFloat(lat.value),
          Number.parseFloat(log.value),
          distance,
        ),
      )
      .map(async (event) => {
        const category = await this.eventCategorySearcher.search({
          id: event.categoryId.value,
        });
        return { event, category };
      });

    const events = await Promise.all(eventsPromise);

    events
      .map(({ event, category }) => ({
        event: event.toPrimitives(),
        category: category.toPrimitives(),
      }))
      .map(({ event, category }) => ({
        id: event.id,
        status: event.status,
        free: event.free,
        website: event.website,
        payment_url: event.paymentUrl,
        facebook_url: event.facebookUrl,
        instagram_url: event.instagramUrl,
        whatsapp_url: event.whatsappUrl,
        contact_phone: event.contactPhone,
        map: event.map,
        title: event.title,
        image_banner_vertical: event.imageBannerVertical,
        image_banner_horizontal: event.imageBannerHorizontal,
        city: city.toPrimitives(),
        category,
        address: event.address,
        latitude: event.latitude,
        longitude: event.longitude,
        description: event.description,
        price: event.price,
        start_at: event.startAt,
        end_at: event.endAt,
        created_at: event.createdAt,
        updated_at: event.updatedAt,
      }));
    return {
      events,
      'categories': categoryAll
    }
  }
}
