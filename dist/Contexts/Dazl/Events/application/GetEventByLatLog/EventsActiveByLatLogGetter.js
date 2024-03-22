"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsActiveByLatLogGetter = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const CityByLatLogGetter_1 = require("../../../City/application/GetByLatLog/CityByLatLogGetter");
const CityLatitude_1 = require("../../../City/domain/CityLatitude");
const CityLongitude_1 = require("../../../City/domain/CityLongitude");
const EventCategorySearcher_1 = require("../../../EventCategory/application/search/EventCategorySearcher");
const geometric_calculator_service_1 = require("../../../Shared/application/calculator-if-within-radius/geometric-calculator.service");
let EventsActiveByLatLogGetter = class EventsActiveByLatLogGetter {
    constructor(eventRepository, cityByLatLogGetter, eventCategorySearcher, geometricCalculatorService) {
        this.eventRepository = eventRepository;
        this.cityByLatLogGetter = cityByLatLogGetter;
        this.eventCategorySearcher = eventCategorySearcher;
        this.geometricCalculatorService = geometricCalculatorService;
    }
    async run({ lat, log, distance }) {
        const city = await this.cityByLatLogGetter.run({
            lat: new CityLatitude_1.CityLatitude(lat.value),
            log: new CityLongitude_1.CityLongitude(log.value),
        });
        const eventsAll = await this.eventRepository.searchActive();
        const categoryAll = await this.eventCategorySearcher.getAll();
        const eventsPromise = eventsAll
            .filter((event) => event.cityId.equals(city.id))
            .filter((event) => this.geometricCalculatorService.isInsideRadio(Number.parseFloat(event.latitude.value), Number.parseFloat(event.longitude.value), Number.parseFloat(lat.value), Number.parseFloat(log.value), distance))
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
        };
    }
};
EventsActiveByLatLogGetter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.EVENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, CityByLatLogGetter_1.CityByLatLogGetter,
        EventCategorySearcher_1.EventCategorySearcher,
        geometric_calculator_service_1.GeometricCalculatorService])
], EventsActiveByLatLogGetter);
exports.EventsActiveByLatLogGetter = EventsActiveByLatLogGetter;
//# sourceMappingURL=EventsActiveByLatLogGetter.js.map