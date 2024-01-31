import { EntitySchema } from 'typeorm';
import { Event } from '../../../domain/Event';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { EventId } from '../../../domain/EventId';
import { EventAddress } from '../../../domain/EventAddress';
import { EventImageBannerVertical } from '../../../domain/EventImageBannerVertical';
import { CityId } from '../../../../City/domain/CityId';
import { CreatedAt } from '../../../../../Shared/domain/CreatedAt';
import { UpdatedAt } from '../../../../../Shared/domain/UpdatedAt';
import { EventDescription } from '../../../domain/EventDescription';
import { EventLatitude } from '../../../domain/EventLatitude';
import { EventLongitude } from '../../../domain/EventLongitude';
import { EventStartAt } from '../../../domain/EventStartAt';
import { EventEndAt } from '../../../domain/EventEndAt';
import { EventPrice } from '../../../domain/EventPrice';
import { EventTitle } from '../../../domain/EventTitle';
import { EventContactPhone } from '../../../domain/EventContactPhone';
import { EventFree } from '../../../domain/EventFree';
import { EventFacebookUrl } from '../../../domain/EventFacebookUrl';
import { EventInstagramUrl } from '../../../domain/EventInstagramUrl';
import { EventPaymentUrl } from '../../../domain/EventPaymentUrl';
import { EventMap } from '../../../domain/EventMap';
import { EventWhatsappUrl } from '../../../domain/EventWhatsappUrl';
import { EventWebsite } from '../../../domain/EventWebsite';
import { EventStatus } from '../../../domain/EventStatus';

export const EventEntity = new EntitySchema<Event>({
  name: 'Event',
  tableName: 'events',
  target: Event,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(EventId),
    },
    status: {
      type: String,
      transformer: ValueObjectTransformer(EventStatus),
    },
    address: {
      type: 'text',
      transformer: ValueObjectTransformer(EventAddress),
    },
    categoryId: {
      type: String,
      nullable: true,
      name: 'category_id',
      transformer: ValueObjectTransformer(EventId),
    },
    cityId: {
      type: String,
      name: 'city_id',
      transformer: ValueObjectTransformer(CityId),
    },
    description: {
      type: 'text',
      transformer: ValueObjectTransformer(EventDescription),
    },
    latitude: {
      type: String,
      transformer: ValueObjectTransformer(EventLatitude),
    },
    longitude: {
      type: String,
      transformer: ValueObjectTransformer(EventLongitude),
    },
    startAt: {
      type: 'timestamp',
      name: 'start_at',
      transformer: ValueObjectTransformer(EventStartAt),
    },
    endAt: {
      type: 'timestamp',
      name: 'end_at',
      transformer: ValueObjectTransformer(EventEndAt),
    },
    price: {
      type: Number,
      transformer: ValueObjectTransformer(EventPrice),
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(EventTitle),
    },
    imageBannerHorizontal: {
      type: 'text',
      nullable: true,
      name: 'image_banner_horizontal',
      transformer: ValueObjectTransformer(EventImageBannerVertical),
    },
    imageBannerVertical: {
      type: 'text',
      name: 'image_banner_vertical',
      transformer: ValueObjectTransformer(EventImageBannerVertical),
    },
    contactPhone: {
      type: String,
      nullable: true,
      name: 'contact_phone',
      transformer: ValueObjectTransformer(EventContactPhone),
    },
    free: {
      type: Boolean,
      nullable: true,
      transformer: ValueObjectTransformer(EventFree),
    },
    facebookUrl: {
      type: String,
      nullable: true,
      name: 'facebook_url',
      transformer: ValueObjectTransformer(EventFacebookUrl),
    },
    instagramUrl: {
      type: String,
      name: 'instagram_url',
      nullable: true,
      transformer: ValueObjectTransformer(EventInstagramUrl),
    },
    paymentUrl: {
      type: String,
      name: 'payment_url',
      nullable: true,

      transformer: ValueObjectTransformer(EventPaymentUrl),
    },
    map: {
      type: String,
      nullable: true,

      transformer: ValueObjectTransformer(EventMap),
    },
    whatsappUrl: {
      type: String,
      nullable: true,
      name: 'whatsapp_url',
      transformer: ValueObjectTransformer(EventWhatsappUrl),
    },
    website: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(EventWebsite),
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(CreatedAt),
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      transformer: ValueObjectTransformer(UpdatedAt),
    },
  },
});
