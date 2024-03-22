"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
class Event extends AggregateRoot_1.AggregateRoot {
    constructor(id, title, status, free, categoryId, cityId, address, map, price, description, startAt, endAt, latitude, longitude, imageBannerVertical, imageBannerHorizontal, website, paymentUrl, facebookUrl, instagramUrl, whatsappUrl, contactPhone, createdAt, updatedAt) {
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
    toPrimitives() {
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
exports.Event = Event;
//# sourceMappingURL=Event.js.map