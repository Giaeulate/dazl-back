"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
class Country extends AggregateRoot_1.AggregateRoot {
    constructor(id, name, createdAt, updatedAt) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
}
exports.Country = Country;
//# sourceMappingURL=Country.js.map