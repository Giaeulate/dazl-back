"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationEntity = void 0;
const typeorm_1 = require("typeorm");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const UserActivation_1 = require("../../../domain/UserActivation");
const UserActivationId_1 = require("../../../domain/UserActivationId");
const UserActivationImage_1 = require("../../../domain/UserActivationImage");
const UserActivationDetails_1 = require("../../../domain/UserActivationDetails");
const UserActivationTimeAdded_1 = require("../../../domain/UserActivationTimeAdded");
const UserActivationActive_1 = require("../../../domain/UserActivationActive");
const UserActivationName_1 = require("../../../domain/UserActivationName");
const UserActivationMale_1 = require("../../../domain/UserActivationMale");
const UserActivationFemale_1 = require("../../../domain/UserActivationFemale");
const UserActivationActiveDate_1 = require("../../../domain/UserActivationActiveDate");
const UserActivationExpirationDate_1 = require("../../../domain/UserActivationExpirationDate");
const UserActivationLongitude_1 = require("../../../domain/UserActivationLongitude");
const UserActivationLatitude_1 = require("../../../domain/UserActivationLatitude");
const UserId_1 = require("../../../../users/domain/UserId");
const UserActivationSocketId_1 = require("../../../domain/UserActivationSocketId");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const UserActivationCurrentLives_1 = require("../../../domain/UserActivationCurrentLives");
const UserActivationIsActiveSocket_1 = require("../../../domain/UserActivationIsActiveSocket");
const UserActivationIsTheLocatorActivated_1 = require("../../../domain/UserActivationIsTheLocatorActivated");
const UserActivationUserIsDeleted_1 = require("../../../domain/UserActivationUserIsDeleted");
const UserActivationAgeLowerFilter_1 = require("../../../domain/UserActivationAgeLowerFilter");
const UserActivationAgeUpperFilter_1 = require("../../../domain/UserActivationAgeUpperFilter");
const UserActivationDistanceFilter_1 = require("../../../domain/UserActivationDistanceFilter");
const UserActivationLgtb_1 = require("../../../domain/UserActivationLgtb");
const CityId_1 = require("../../../../City/domain/CityId");
const UserActivationToken_1 = require("../../../domain/UserActivationToken");
exports.UserActivationEntity = new typeorm_1.EntitySchema({
    name: 'UserActivation',
    tableName: 'user_activations',
    target: UserActivation_1.UserActivation,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationId_1.UserActivationId),
        },
        userId: {
            name: 'user_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        fileImageId: {
            name: 'file_image_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationImage_1.UserActivationImage),
        },
        details: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationDetails_1.UserActivationDetails),
        },
        timeAdded: {
            name: 'time_added',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationTimeAdded_1.UserActivationTimeAdded),
        },
        active: {
            type: 'int',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationActive_1.UserActivationActive),
        },
        name: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationName_1.UserActivationName),
        },
        male: {
            type: 'int',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationMale_1.UserActivationMale),
        },
        female: {
            type: 'int',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationFemale_1.UserActivationFemale),
        },
        lgtb: {
            type: 'int',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationLgtb_1.UserActivationLgtb),
        },
        activeDate: {
            name: 'active_date',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationActiveDate_1.UserActivationActiveDate),
        },
        expirationDate: {
            name: 'expiration_date',
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationExpirationDate_1.UserActivationExpirationDate),
        },
        currentLives: {
            name: 'current_lives',
            type: 'int',
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationCurrentLives_1.UserActivationCurrentLives),
        },
        ageLowerFilter: {
            name: 'age_lower_filter',
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationAgeLowerFilter_1.UserActivationAgeLowerFilter),
        },
        ageUpperFilter: {
            name: 'age_upper_filter',
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationAgeUpperFilter_1.UserActivationAgeUpperFilter),
        },
        distanceFilter: {
            name: 'distance_filter',
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationDistanceFilter_1.UserActivationDistanceFilter),
        },
        longitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationLongitude_1.UserActivationLongitude),
        },
        latitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationLatitude_1.UserActivationLatitude),
        },
        isActiveSocket: {
            name: 'is_active_socket',
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationIsActiveSocket_1.UserActivationIsActiveSocket),
        },
        socketId: {
            name: 'socket_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationSocketId_1.UserActivationSocketId),
        },
        isTheLocatorActivated: {
            name: 'is_the_locator_activated',
            type: 'int',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationIsTheLocatorActivated_1.UserActivationIsTheLocatorActivated),
        },
        userIsDeleted: {
            name: 'user_is_deleted',
            type: 'int',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationUserIsDeleted_1.UserActivationUserIsDeleted),
        },
        cityId: {
            name: 'city_id',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CityId_1.CityId),
        },
        token: {
            type: 'text',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActivationToken_1.UserActivationToken),
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
//# sourceMappingURL=UserActivationEntity.js.map