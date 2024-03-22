"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const UserId_1 = require("./UserId");
const UserFirstName_1 = require("./UserFirstName");
const UserLastName_1 = require("./UserLastName");
const UserGender_1 = require("./UserGender");
const UserAge_1 = require("./UserAge");
const UserName_1 = require("./UserName");
const UserEmail_1 = require("./UserEmail");
const UserPassword_1 = require("./UserPassword");
const UserPopularity_1 = require("./UserPopularity");
const UserConfirmationCode_1 = require("./UserConfirmationCode");
const UserConfirmationTime_1 = require("./UserConfirmationTime");
const UserStatus_1 = require("./UserStatus");
const UserLatitude_1 = require("./UserLatitude");
const UserLongitude_1 = require("./UserLongitude");
const UserActiveDate_1 = require("./UserActiveDate");
const UserExpirationDate_1 = require("./UserExpirationDate");
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const UserCreatedDomainEvent_1 = require("./UserCreatedDomainEvent");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const UserTokenFirebase_1 = require("./UserTokenFirebase");
const UserActive_1 = require("./UserActive");
const UserFacebookUrl_1 = require("./UserFacebookUrl");
const UserInstagramUrl_1 = require("./UserInstagramUrl");
const UserWhatsappUrl_1 = require("./UserWhatsappUrl");
const UserDesactiveDomainEvent_1 = require("./UserDesactiveDomainEvent");
const UserBadge_1 = require("./UserBadge");
const UserEmailConfirmationCode_1 = require("./UserEmailConfirmationCode");
const UserIsEmailConfirmed_1 = require("./UserIsEmailConfirmed");
class User extends AggregateRoot_1.AggregateRoot {
    constructor(id, firstName, lastName, gender, age, name, email, password, popularity, confirmationCode, confirmationTime, tokenFirebase, status, latitude, longitude, activeDate, expirationDate, active, otherEmail, instagramUrl, whatsappUrl, badge, emailConfirmationCode, isEmailConfirmed) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.name = name;
        this.email = email;
        this.password = password;
        this.popularity = popularity;
        this.confirmationCode = confirmationCode;
        this.confirmationTime = confirmationTime;
        this.tokenFirebase = tokenFirebase;
        this.status = status;
        this.latitude = latitude;
        this.longitude = longitude;
        this.activeDate = activeDate;
        this.expirationDate = expirationDate;
        this._active = active;
        this.otherEmail = otherEmail;
        this.instagramUrl = instagramUrl;
        this.whatsappUrl = whatsappUrl;
        this._badge = badge;
        this.emailConfirmationCode = emailConfirmationCode;
        this.isEmailConfirmed = isEmailConfirmed;
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    static generateCode() {
        return Math.random().toString(36).slice(-6).toUpperCase();
    }
    static create(plainData) {
        const userFromPrimitives = this.fromPrimitives(Object.assign(Object.assign({}, plainData), { active: 1, otherEmail: '', instagramUrl: '', whatsappUrl: '', badge: 0, emailConfirmationCode: this.generateCode(), isEmailConfirmed: 0 }));
        const user = new User(userFromPrimitives.id, userFromPrimitives.firstName, userFromPrimitives.lastName, userFromPrimitives.gender, userFromPrimitives.age, userFromPrimitives.name, userFromPrimitives.email, userFromPrimitives.password
            ? userFromPrimitives.password
            : new UserPassword_1.UserPassword(''), userFromPrimitives.popularity, userFromPrimitives.confirmationCode, userFromPrimitives.confirmationTime, userFromPrimitives.tokenFirebase, userFromPrimitives.status, userFromPrimitives.latitude, userFromPrimitives.longitude, userFromPrimitives.activeDate, userFromPrimitives.expirationDate, userFromPrimitives._active, userFromPrimitives.otherEmail, userFromPrimitives.instagramUrl, userFromPrimitives.whatsappUrl, userFromPrimitives._badge, userFromPrimitives.emailConfirmationCode, userFromPrimitives.isEmailConfirmed);
        user.record(new UserCreatedDomainEvent_1.UserCreatedDomainEvent({
            aggregateId: user.id.value,
            email: user.email.value,
            emailConfirmationCode: user.emailConfirmationCode.value,
        }));
        return user;
    }
    static fromPrimitives(plainData) {
        return new User(new UserId_1.UserId(plainData.id), new UserFirstName_1.UserFirstName(plainData.firstName), new UserLastName_1.UserLastName(plainData.lastName), new UserGender_1.UserGender(plainData.gender), new UserAge_1.UserAge(plainData.age), new UserName_1.UserName(plainData.name), new UserEmail_1.UserEmail(plainData.email), new UserPassword_1.UserPassword(plainData.password), new UserPopularity_1.UserPopularity(plainData.popularity), new UserConfirmationCode_1.UserConfirmationCode(plainData.confirmationCode), new UserConfirmationTime_1.UserConfirmationTime(plainData.confirmationTime), new UserTokenFirebase_1.UserTokenFirebase(plainData.tokenFirebase), new UserStatus_1.UserStatus(plainData.status), new UserLatitude_1.UserLatitude(plainData.latitude), new UserLongitude_1.UserLongitude(plainData.longitude), new UserActiveDate_1.UserActiveDate(plainData.activeDate), new UserExpirationDate_1.UserExpirationDate(plainData.expirationDate), new UserActive_1.UserActive(plainData.active), new UserFacebookUrl_1.UserFacebookUrl(plainData.otherEmail), new UserInstagramUrl_1.UserInstagramUrl(plainData.instagramUrl), new UserWhatsappUrl_1.UserWhatsappUrl(plainData.whatsappUrl), new UserBadge_1.UserBadge(plainData.badge), new UserEmailConfirmationCode_1.UserEmailConfirmationCode(plainData.emailConfirmationCode), new UserIsEmailConfirmed_1.UserIsEmailConfirmed(plainData.isEmailConfirmed));
    }
    get badge() {
        return this._badge;
    }
    set badge(value) {
        this._badge = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    desactive() {
        this.active = UserActive_1.UserActive.inactive();
        this.record(new UserDesactiveDomainEvent_1.UserDesactiveDomainEvent({
            id: this.id.value,
            aggregateId: this.id.value,
        }));
    }
    toPrimitives() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        return {
            id: (_a = this.id) === null || _a === void 0 ? void 0 : _a.value,
            firstName: (_b = this.firstName) === null || _b === void 0 ? void 0 : _b.value,
            lastName: (_c = this.lastName) === null || _c === void 0 ? void 0 : _c.value,
            gender: (_d = this.gender) === null || _d === void 0 ? void 0 : _d.value,
            birthday: (_e = this.age) === null || _e === void 0 ? void 0 : _e.value,
            name: (_f = this.name) === null || _f === void 0 ? void 0 : _f.value,
            email: (_g = this.email) === null || _g === void 0 ? void 0 : _g.value,
            password: (_h = this.password) === null || _h === void 0 ? void 0 : _h.value,
            popularity: (_j = this.popularity) === null || _j === void 0 ? void 0 : _j.value,
            confirmationCode: (_k = this.confirmationCode) === null || _k === void 0 ? void 0 : _k.value,
            confirmationTime: (_l = this.confirmationTime) === null || _l === void 0 ? void 0 : _l.value,
            status: (_m = this.status) === null || _m === void 0 ? void 0 : _m.value,
            latitude: (_o = this.latitude) === null || _o === void 0 ? void 0 : _o.value,
            longitude: (_p = this.longitude) === null || _p === void 0 ? void 0 : _p.value,
            activeDate: (_q = this.activeDate) === null || _q === void 0 ? void 0 : _q.value,
            expirationDate: (_r = this.expirationDate) === null || _r === void 0 ? void 0 : _r.value,
            active: (_s = this._active) === null || _s === void 0 ? void 0 : _s.value,
            otherEmail: (_t = this.otherEmail) === null || _t === void 0 ? void 0 : _t.value,
            instagramUrl: (_u = this.instagramUrl) === null || _u === void 0 ? void 0 : _u.value,
            whatsappUrl: (_v = this.whatsappUrl) === null || _v === void 0 ? void 0 : _v.value,
            createdAt: (_w = this.createdAt) === null || _w === void 0 ? void 0 : _w.value,
            updatedAt: (_x = this.updatedAt) === null || _x === void 0 ? void 0 : _x.value,
        };
    }
    resetBadge() {
        this._badge = new UserBadge_1.UserBadge(0);
    }
    isActiveEmail() {
        return this.isEmailConfirmed.value === 1;
    }
    confirmEmail() {
        this.isEmailConfirmed = UserIsEmailConfirmed_1.UserIsEmailConfirmed.confirmed();
        this.emailConfirmationCode = new UserEmailConfirmationCode_1.UserEmailConfirmationCode('');
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map