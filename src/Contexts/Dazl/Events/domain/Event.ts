import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CreatedAt } from '../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../Shared/domain/UpdatedAt';
import { EventId } from './EventId';
import { EventImageBannerVertical } from './EventImageBannerVertical';
import { EventTitle } from './EventTitle';
import { EventAddress } from './EventAddress';
import { EventDescription } from './EventDescription';
import { EventLatitude } from './EventLatitude';
import { EventLongitude } from './EventLongitude';
import { EventPrice } from './EventPrice';
import { EventStartAt } from './EventStartAt';
import { EventEndAt } from './EventEndAt';
import { CityId } from '../../City/domain/CityId';
import { EventImageBannerHorizontal } from './EventImageBannerHorizontal';
import { EventCategoryId } from '../../EventCategory/domain/EventCategoryId';
import { EventFree } from './EventFree';
import { EventMap } from './EventMap';
import { EventWebsite } from './EventWebsite';
import { EventPaymentUrl } from './EventPaymentUrl';
import { EventFacebookUrl } from './EventFacebookUrl';
import { EventInstagramUrl } from './EventInstagramUrl';
import { EventWhatsappUrl } from './EventWhatsappUrl';
import { EventContactPhone } from './EventContactPhone';
import { EventStatus } from './EventStatus';

export class Event extends AggregateRoot {
  readonly id: EventId;
  readonly title: EventTitle;
  readonly status: EventStatus;
  readonly free: EventFree;
  readonly categoryId: EventCategoryId;
  readonly cityId: CityId;
  readonly address: EventAddress;
  readonly map: EventMap;
  readonly price: EventPrice;
  readonly description: EventDescription;
  readonly startAt: EventStartAt;
  readonly endAt: EventEndAt;
  readonly latitude: EventLatitude;
  readonly longitude: EventLongitude;
  readonly imageBannerVertical: EventImageBannerVertical;
  readonly imageBannerHorizontal: EventImageBannerHorizontal;
  readonly website: EventWebsite;
  readonly paymentUrl: EventPaymentUrl;
  readonly facebookUrl: EventFacebookUrl;
  readonly instagramUrl: EventInstagramUrl;
  readonly whatsappUrl: EventWhatsappUrl;
  readonly contactPhone: EventContactPhone;
  readonly createdAt: CreatedAt;
  readonly updatedAt: UpdatedAt;

  constructor(
    id: EventId,
    title: EventTitle,
    status: EventStatus,
    free: EventFree,
    categoryId: EventCategoryId,
    cityId: CityId,
    address: EventAddress,
    map: EventMap,
    price: EventPrice,
    description: EventDescription,
    startAt: EventStartAt,
    endAt: EventEndAt,
    latitude: EventLatitude,
    longitude: EventLongitude,
    imageBannerVertical: EventImageBannerVertical,
    imageBannerHorizontal: EventImageBannerHorizontal,
    website: EventWebsite,
    paymentUrl: EventPaymentUrl,
    facebookUrl: EventFacebookUrl,
    instagramUrl: EventInstagramUrl,
    whatsappUrl: EventWhatsappUrl,
    contactPhone: EventContactPhone,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.status = status;
    this.free = free;
    this.categoryId = categoryId;
    this.cityId = cityId;
    this.address = address;
    this.map = map;
    this.price = price;
    this.description = description;
    this.startAt = startAt;
    this.endAt = endAt;
    this.latitude = latitude;
    this.longitude = longitude;
    this.imageBannerVertical = imageBannerVertical;
    this.imageBannerHorizontal = imageBannerHorizontal;
    this.website = website;
    this.paymentUrl = paymentUrl;
    this.facebookUrl = facebookUrl;
    this.instagramUrl = instagramUrl;
    this.whatsappUrl = whatsappUrl;
    this.contactPhone = contactPhone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      title: this.title.value,
      status: this.status.value,
      free: this.free.value,
      categoryId: this.categoryId.value,
      cityId: this.cityId.value,
      address: this.address.value,
      map: this.map.value,
      price: this.price.value,
      description: this.description.value,
      startAt: this.startAt.value,
      endAt: this.endAt.value,
      latitude: this.latitude.value,
      longitude: this.longitude.value,
      imageBannerVertical: this.imageBannerVertical.value,
      imageBannerHorizontal: this.imageBannerHorizontal.value,
      website: this.website.value,
      paymentUrl: this.paymentUrl.value,
      facebookUrl: this.facebookUrl.value,
      instagramUrl: this.instagramUrl.value,
      whatsappUrl: this.whatsappUrl.value,
      contactPhone: this.contactPhone.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
