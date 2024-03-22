"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../../domain/User");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const UserFirstName_1 = require("../../../domain/UserFirstName");
const UserId_1 = require("../../../domain/UserId");
const UserLastName_1 = require("../../../domain/UserLastName");
const UserGender_1 = require("../../../domain/UserGender");
const UserName_1 = require("../../../domain/UserName");
const UserEmail_1 = require("../../../domain/UserEmail");
const UserPassword_1 = require("../../../domain/UserPassword");
const UserPopularity_1 = require("../../../domain/UserPopularity");
const UserConfirmationCode_1 = require("../../../domain/UserConfirmationCode");
const UserConfirmationTime_1 = require("../../../domain/UserConfirmationTime");
const UserStatus_1 = require("../../../domain/UserStatus");
const UserLatitude_1 = require("../../../domain/UserLatitude");
const UserActiveDate_1 = require("../../../domain/UserActiveDate");
const UserExpirationDate_1 = require("../../../domain/UserExpirationDate");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
const UserLongitude_1 = require("../../../domain/UserLongitude");
const UserTokenFirebase_1 = require("../../../domain/UserTokenFirebase");
const UserAge_1 = require("../../../domain/UserAge");
const UserActive_1 = require("../../../domain/UserActive");
const UserFacebookUrl_1 = require("../../../domain/UserFacebookUrl");
const UserInstagramUrl_1 = require("../../../domain/UserInstagramUrl");
const UserWhatsappUrl_1 = require("../../../domain/UserWhatsappUrl");
const UserBadge_1 = require("../../../domain/UserBadge");
const UserEmailConfirmationCode_1 = require("../../../domain/UserEmailConfirmationCode");
const UserIsEmailConfirmed_1 = require("../../../domain/UserIsEmailConfirmed");
exports.UserEntity = new typeorm_1.EntitySchema({
    name: 'User',
    tableName: 'users',
    target: User_1.User,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserId_1.UserId),
        },
        firstName: {
            name: 'first_name',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserFirstName_1.UserFirstName),
        },
        lastName: {
            name: 'last_name',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLastName_1.UserLastName),
        },
        gender: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserGender_1.UserGender),
        },
        age: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserAge_1.UserAge),
        },
        name: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserName_1.UserName),
        },
        email: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserEmail_1.UserEmail),
        },
        password: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserPassword_1.UserPassword),
        },
        popularity: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserPopularity_1.UserPopularity),
        },
        confirmationCode: {
            name: 'confirmation_code',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserConfirmationCode_1.UserConfirmationCode),
        },
        confirmationTime: {
            name: 'confirmation_time',
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserConfirmationTime_1.UserConfirmationTime),
        },
        tokenFirebase: {
            name: 'token_firebase',
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserTokenFirebase_1.UserTokenFirebase),
        },
        status: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserStatus_1.UserStatus),
        },
        latitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLatitude_1.UserLatitude),
        },
        longitude: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserLongitude_1.UserLongitude),
        },
        activeDate: {
            name: 'active_date',
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActiveDate_1.UserActiveDate),
        },
        expirationDate: {
            name: 'expiration_date',
            type: String,
            nullable: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserExpirationDate_1.UserExpirationDate),
        },
        active: {
            type: 'int',
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserActive_1.UserActive),
        },
        otherEmail: {
            name: 'facebook_url',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserFacebookUrl_1.UserFacebookUrl),
        },
        instagramUrl: {
            name: 'instagram_url',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserInstagramUrl_1.UserInstagramUrl),
        },
        whatsappUrl: {
            name: 'whatsapp_url',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserWhatsappUrl_1.UserWhatsappUrl),
        },
        badge: {
            type: Number,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserBadge_1.UserBadge),
        },
        emailConfirmationCode: {
            name: 'email_confirmation_code',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserEmailConfirmationCode_1.UserEmailConfirmationCode),
        },
        isEmailConfirmed: {
            name: 'is_email_confirmed',
            type: 'int',
            default: 1,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UserIsEmailConfirmed_1.UserIsEmailConfirmed),
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
//# sourceMappingURL=UserEntity.js.map