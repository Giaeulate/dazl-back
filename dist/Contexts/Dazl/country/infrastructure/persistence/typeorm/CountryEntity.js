"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryEntity = void 0;
const typeorm_1 = require("typeorm");
const Country_1 = require("../../../domain/Country");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const CountryId_1 = require("../../../domain/CountryId");
const CountryName_1 = require("../../../domain/CountryName");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
exports.CountryEntity = new typeorm_1.EntitySchema({
    name: 'Country',
    tableName: 'countries',
    target: Country_1.Country,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CountryId_1.CountryId),
        },
        name: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CountryName_1.CountryName),
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
//# sourceMappingURL=CountryEntity.js.map