"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivation = void 0;
const UserId_1 = require("../../users/domain/UserId");
const UserActivationId_1 = require("./UserActivationId");
const UserActivationDetails_1 = require("./UserActivationDetails");
const UserActivationTimeAdded_1 = require("./UserActivationTimeAdded");
const UserActivationActive_1 = require("./UserActivationActive");
const UserActivationName_1 = require("./UserActivationName");
const UserActivationMale_1 = require("./UserActivationMale");
const UserActivationFemale_1 = require("./UserActivationFemale");
const UserActivationActiveDate_1 = require("./UserActivationActiveDate");
const UserActivationExpirationDate_1 = require("./UserActivationExpirationDate");
const UserActivationLongitude_1 = require("./UserActivationLongitude");
const UserActivationLatitude_1 = require("./UserActivationLatitude");
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const UserActivationCreatedDomainEvent_1 = require("./UserActivationCreatedDomainEvent");
const UserActivationSocketId_1 = require("./UserActivationSocketId");
const FileId_1 = require("../../file/domain/FileId");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const indexDto_1 = require("./dto/indexDto");
const UserActivationCurrentLives_1 = require("./UserActivationCurrentLives");
const UserActivationIsActiveSocket_1 = require("./UserActivationIsActiveSocket");
const IsBoolean_1 = require("../../Shared/IsBoolean");
const UserActivationDeactivatedDomainEvent_1 = require("./UserActivationDeactivatedDomainEvent");
const UserActivationActivatedDomainEvent_1 = require("./UserActivationActivatedDomainEvent");
const TimeActivation_1 = require("../../../../apps/dazl/backend/config/TimeActivation");
const UserActivationIsTheLocatorActivated_1 = require("./UserActivationIsTheLocatorActivated");
const UserActivationUpdateLocatorDomainEvent_1 = require("./UserActivationUpdateLocatorDomainEvent");
const UserActivationUserIsDeleted_1 = require("./UserActivationUserIsDeleted");
const UserActivationAgeUpperFilter_1 = require("./UserActivationAgeUpperFilter");
const UserActivationAgeLowerFilter_1 = require("./UserActivationAgeLowerFilter");
const UserActivationDistanceFilter_1 = require("./UserActivationDistanceFilter");
const UserActivationLgtb_1 = require("./UserActivationLgtb");
const CityId_1 = require("../../City/domain/CityId");
const UserActivationToken_1 = require("./UserActivationToken");
class UserActivation extends AggregateRoot_1.AggregateRoot {
    get distanceFilter() {
        return this._distanceFilter;
    }
    set distanceFilter(value) {
        this._distanceFilter = value;
    }
    get ageLowerFilter() {
        return this._ageLowerFilter;
    }
    set ageLowerFilter(value) {
        this._ageLowerFilter = value;
    }
    get ageUpperFilter() {
        return this._ageUpperFilter;
    }
    set ageUpperFilter(value) {
        this._ageUpperFilter = value;
    }
    get details() {
        return this._details;
    }
    set details(value) {
        this._details = value;
    }
    get isTheLocatorActivated() {
        return this._isTheLocatorActivated;
    }
    set isTheLocatorActivated(value) {
        this._isTheLocatorActivated = value;
    }
    set active(value) {
        this._active = value;
    }
    get active() {
        return this._active;
    }
    activeSession() {
        this._active = new UserActivationActive_1.UserActivationActive(1);
        this.record(new UserActivationActivatedDomainEvent_1.UserActivationActivatedDomainEvent({
            aggregateId: this.id.value,
            userId: this.userId.value,
        }));
    }
    updateLocator(value) {
        this._isTheLocatorActivated = value;
        this.record(new UserActivationUpdateLocatorDomainEvent_1.UserActivationUpdateLocatorDomainEvent({
            aggregateId: this.id.value,
            socketId: this.socketId.value,
        }));
    }
    changeDetails(value) {
        this._details = value;
    }
    constructor(id, cityId, userId, fileImageId, details, name, male, lgtb, female, longitude, latitude, socketId, token) {
        super();
        this.id = id;
        this.cityId = cityId;
        this.userId = userId;
        this.fileImageId = fileImageId;
        this._details = details;
        this.timeAdded = new UserActivationTimeAdded_1.UserActivationTimeAdded(new Date().toISOString().slice(0, 19).replace('T', ' '));
        this._isTheLocatorActivated = new UserActivationIsTheLocatorActivated_1.UserActivationIsTheLocatorActivated(1);
        this._active = new UserActivationActive_1.UserActivationActive(IsBoolean_1.IsBoolean.TRUE);
        this.name = name;
        this.male = male;
        this.female = female;
        this.lgtb = lgtb;
        this.activeDate = new UserActivationActiveDate_1.UserActivationActiveDate(new Date().getTime().toString());
        this.expirationDate = new UserActivationExpirationDate_1.UserActivationExpirationDate(new Date(new Date().getTime() + TimeActivation_1.TimeActivation.ACTIVATION_TIME)
            .getTime()
            .toString());
        this.currentLives = new UserActivationCurrentLives_1.UserActivationCurrentLives(3);
        this._ageUpperFilter = new UserActivationAgeUpperFilter_1.UserActivationAgeUpperFilter(0);
        this._ageLowerFilter = new UserActivationAgeLowerFilter_1.UserActivationAgeLowerFilter(0);
        this._distanceFilter = new UserActivationDistanceFilter_1.UserActivationDistanceFilter(0);
        this.longitude = longitude;
        this.latitude = latitude;
        this.isActiveSocket = new UserActivationIsActiveSocket_1.UserActivationIsActiveSocket(IsBoolean_1.IsBoolean.TRUE);
        this.socketId = socketId;
        this.userIsDeleted = UserActivationUserIsDeleted_1.UserActivationUserIsDeleted.available();
        this.token = token;
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    deactivate() {
        this._active = new UserActivationActive_1.UserActivationActive(0);
        this.record(new UserActivationDeactivatedDomainEvent_1.UserActivationDeactivatedDomainEvent({
            aggregateId: this.id.value,
            userId: this.userId.value,
        }));
    }
    static create(plainData) {
        const userActivationFromPrimitives = this.fromPrimitives(plainData);
        const userActivation = new UserActivation(userActivationFromPrimitives.id, userActivationFromPrimitives.cityId, userActivationFromPrimitives.userId, userActivationFromPrimitives.fileImageId, userActivationFromPrimitives._details, userActivationFromPrimitives.name, userActivationFromPrimitives.male, userActivationFromPrimitives.lgtb, userActivationFromPrimitives.female, userActivationFromPrimitives.longitude, userActivationFromPrimitives.latitude, userActivationFromPrimitives.socketId, userActivationFromPrimitives.token);
        userActivation.record(new UserActivationCreatedDomainEvent_1.UserActivationCreatedDomainEvent({
            aggregateId: userActivation.id.value,
            socketId: userActivation.socketId.value,
        }));
        return userActivation;
    }
    addExpirationDate(addedTime) {
        const expirationDate = Number(this.expirationDate.value);
        const addedTimeNumber = Number(addedTime.value);
        const newExpirationDate = expirationDate + addedTimeNumber;
        this.expirationDate = new UserActivationExpirationDate_1.UserActivationExpirationDate(newExpirationDate.toString());
    }
    isSocketActive() {
        return this.isActiveSocket.value === IsBoolean_1.IsBoolean.TRUE;
    }
    isActivated() {
        return this.active.value === IsBoolean_1.IsBoolean.TRUE;
    }
    isDeactivated() {
        return this.active.value === IsBoolean_1.IsBoolean.FALSE;
    }
    isStillActive() {
        const expirationDate = Number(this.expirationDate.value);
        const currentDate = new Date().getTime();
        return expirationDate > currentDate;
    }
    userDeleted() {
        this.userIsDeleted = UserActivationUserIsDeleted_1.UserActivationUserIsDeleted.deleted();
    }
    static fromPrimitives(plainData) {
        return new UserActivation(new UserActivationId_1.UserActivationId(plainData.id), new CityId_1.CityId(plainData.cityId), new UserId_1.UserId(plainData.userId), new FileId_1.FileId(plainData.fileImageId), new UserActivationDetails_1.UserActivationDetails(plainData.details), new UserActivationName_1.UserActivationName(plainData.name), new UserActivationMale_1.UserActivationMale(plainData.male ? 1 : 0), new UserActivationLgtb_1.UserActivationLgtb(plainData.lgtb ? 1 : 0), new UserActivationFemale_1.UserActivationFemale(plainData.female ? 1 : 0), new UserActivationLongitude_1.UserActivationLongitude(plainData.longitude), new UserActivationLatitude_1.UserActivationLatitude(plainData.latitude), new UserActivationSocketId_1.UserActivationSocketId(plainData.socketId), new UserActivationToken_1.UserActivationToken(plainData.token));
    }
    toPrimitives() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return new indexDto_1.UserActivationEntityDto((_a = this.userId) === null || _a === void 0 ? void 0 : _a.value, (_b = this.id) === null || _b === void 0 ? void 0 : _b.value, (_c = this._details) === null || _c === void 0 ? void 0 : _c.value, (_d = this.fileImageId) === null || _d === void 0 ? void 0 : _d.value, (_e = this.timeAdded) === null || _e === void 0 ? void 0 : _e.value, (_f = this._active) === null || _f === void 0 ? void 0 : _f.value, (_g = this.name) === null || _g === void 0 ? void 0 : _g.value, (_h = this.male) === null || _h === void 0 ? void 0 : _h.value, (_j = this.female) === null || _j === void 0 ? void 0 : _j.value, (_k = this.activeDate) === null || _k === void 0 ? void 0 : _k.value, (_l = this.expirationDate) === null || _l === void 0 ? void 0 : _l.value, (_m = this.isActiveSocket) === null || _m === void 0 ? void 0 : _m.value, (_o = this.currentLives) === null || _o === void 0 ? void 0 : _o.value, (_p = this.longitude) === null || _p === void 0 ? void 0 : _p.value, (_q = this.latitude) === null || _q === void 0 ? void 0 : _q.value, (_r = this.socketId) === null || _r === void 0 ? void 0 : _r.value, (_s = this.createdAt) === null || _s === void 0 ? void 0 : _s.value, (_t = this.updatedAt) === null || _t === void 0 ? void 0 : _t.value);
    }
    updateLatLng(params) {
        this.longitude = params.longitude;
        this.latitude = params.latitude;
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    takeLives() {
        this.currentLives = new UserActivationCurrentLives_1.UserActivationCurrentLives(0);
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    restartLive() {
        const expirationDateNumber = Number(this.expirationDate.value);
        const nowDateNumber = new Date().getTime();
        const diferenciaEnMilisegundos = expirationDateNumber - nowDateNumber;
        const diferenciaEnMinutos = diferenciaEnMilisegundos / (1000 * 60);
        const horasDeDiferencia = Math.floor(diferenciaEnMinutos / 60);
        const minutosRestantes = Math.round(diferenciaEnMinutos % 60);
        if (horasDeDiferencia % 2 === 0 && minutosRestantes == 0) {
            this.currentLives = new UserActivationCurrentLives_1.UserActivationCurrentLives(3);
        }
    }
    updateConfig(male, female, lgtb) {
        this.male = male;
        this.female = female;
        this.lgtb = lgtb;
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
}
exports.UserActivation = UserActivation;
//# sourceMappingURL=UserActivation.js.map