"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEntity = void 0;
const typeorm_1 = require("typeorm");
const Event_1 = require("../../../domain/Event");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const EventId_1 = require("../../../domain/EventId");
const EventAddress_1 = require("../../../domain/EventAddress");
const EventImageBannerVertical_1 = require("../../../domain/EventImageBannerVertical");
const CityId_1 = require("../../../../City/domain/CityId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const EventDescription_1 = require("../../../domain/EventDescription");
const EventLatitude_1 = require("../../../domain/EventLatitude");
const EventLongitude_1 = require("../../../domain/EventLongitude");
const EventStartAt_1 = require("../../../domain/EventStartAt");
const EventEndAt_1 = require("../../../domain/EventEndAt");
const EventPrice_1 = require("../../../domain/EventPrice");
const EventTitle_1 = require("../../../domain/EventTitle");
const EventContactPhone_1 = require("../../../domain/EventContactPhone");
const EventFree_1 = require("../../../domain/EventFree");
const EventFacebookUrl_1 = require("../../../domain/EventFacebookUrl");
const EventInstagramUrl_1 = require("../../../domain/EventInstagramUrl");
const EventPaymentUrl_1 = require("../../../domain/EventPaymentUrl");
const EventMap_1 = require("../../../domain/EventMap");
const EventWhatsappUrl_1 = require("../../../domain/EventWhatsappUrl");
const EventWebsite_1 = require("../../../domain/EventWebsite");
const EventStatus_1 = require("../../../domain/EventStatus");
exports.EventEntity = new typeorm_1.EntitySchema({
    name: 'Event',
    tableName: 'events',
    target: Event_1.Event,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventId_1.EventId),
        },
        status: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventStatus_1.EventStatus),
        },
        address: {
            type: 'text',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventAddress_1.EventAddress),
        },
        categoryId: {
            type: String,
            nullable: true,
            name: 'category_id',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventId_1.EventId),
        },
        cityId: {
            type: String,
            name: 'city_id',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CityId_1.CityId),
        },
        description: {
            type: 'text',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventDescription_1.EventDescription),
        },
        latitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventLatitude_1.EventLatitude),
        },
        longitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventLongitude_1.EventLongitude),
        },
        startAt: {
            type: 'timestamp',
            name: 'start_at',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventStartAt_1.EventStartAt),
        },
        endAt: {
            type: 'timestamp',
            name: 'end_at',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventEndAt_1.EventEndAt),
        },
        price: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventPrice_1.EventPrice),
        },
        title: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventTitle_1.EventTitle),
        },
        imageBannerHorizontal: {
            type: 'text',
            nullable: true,
            name: 'image_banner_horizontal',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventImageBannerVertical_1.EventImageBannerVertical),
        },
        imageBannerVertical: {
            type: 'text',
            name: 'image_banner_vertical',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventImageBannerVertical_1.EventImageBannerVertical),
        },
        contactPhone: {
            type: String,
            nullable: true,
            name: 'contact_phone',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventContactPhone_1.EventContactPhone),
        },
        free: {
            type: Boolean,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventFree_1.EventFree),
        },
        facebookUrl: {
            type: String,
            nullable: true,
            name: 'facebook_url',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventFacebookUrl_1.EventFacebookUrl),
        },
        instagramUrl: {
            type: String,
            name: 'instagram_url',
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventInstagramUrl_1.EventInstagramUrl),
        },
        paymentUrl: {
            type: String,
            name: 'payment_url',
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventPaymentUrl_1.EventPaymentUrl),
        },
        map: {
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventMap_1.EventMap),
        },
        whatsappUrl: {
            type: String,
            nullable: true,
            name: 'whatsapp_url',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventWhatsappUrl_1.EventWhatsappUrl),
        },
        website: {
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(EventWebsite_1.EventWebsite),
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CreatedAt_1.CreatedAt),
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UpdatedAt_1.UpdatedAt),
        },
    },
});
//# sourceMappingURL=EventEntity.js.map