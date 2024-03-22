"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityEntity = void 0;
const typeorm_1 = require("typeorm");
const City_1 = require("../../../domain/City");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const CityId_1 = require("../../../domain/CityId");
const CityName_1 = require("../../../domain/CityName");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const CityLatitude_1 = require("../../../domain/CityLatitude");
const CityLongitude_1 = require("../../../domain/CityLongitude");
const CountryId_1 = require("../../../../country/domain/CountryId");
exports.CityEntity = new typeorm_1.EntitySchema({
    name: 'City',
    tableName: 'cities',
    target: City_1.City,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CityId_1.CityId),
        },
        countryId: {
            type: String,
            name: 'country_id',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CountryId_1.CountryId),
        },
        name: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CityName_1.CityName),
        },
        latitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CityLatitude_1.CityLatitude),
        },
        longitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CityLongitude_1.CityLongitude),
        },
        createdAt: {
            name: 'created_at',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CreatedAt_1.CreatedAt),
        },
        updatedAt: {
            name: 'updated_at',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UpdatedAt_1.UpdatedAt),
        },
    },
});
//# sourceMappingURL=CityEntity.js.map