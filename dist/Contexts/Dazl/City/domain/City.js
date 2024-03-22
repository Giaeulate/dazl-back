"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
class City extends AggregateRoot_1.AggregateRoot {
    constructor(id, name, countryId, latitude, longitude, createdAt, updatedAt) {
        super();
        this.id = id;
        this.name = name;
        this.countryId = countryId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            countryId: this.countryId.value,
            latitude: this.latitude.value,
            longitude: this.longitude.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
exports.City = City;
//# sourceMappingURL=City.js.map