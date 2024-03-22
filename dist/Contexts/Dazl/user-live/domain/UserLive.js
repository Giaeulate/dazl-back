"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLive = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const UserLiveId_1 = require("./UserLiveId");
const UserLiveActive_1 = require("./UserLiveActive");
const UserLiveExpirationDate_1 = require("./UserLiveExpirationDate");
const UserLiveActiveDate_1 = require("./UserLiveActiveDate");
const UserId_1 = require("../../users/domain/UserId");
const UserLiveStatus_1 = require("./UserLiveStatus");
const UserLiveStatusInactivedDomainEvent_1 = require("./UserLiveStatusInactivedDomainEvent");
class UserLive extends AggregateRoot_1.AggregateRoot {
    constructor(id, userId, active, status, expirationDate, activeDate, createdAt, updatedAt) {
        super();
        this.id = id;
        this.userId = userId;
        this._active = active;
        this._status = status;
        this._expirationDate = expirationDate;
        this._activeDate = activeDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(value) {
        this._activeDate = value;
    }
    get expirationDate() {
        return this._expirationDate;
    }
    set expirationDate(value) {
        this._expirationDate = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    static create(params) {
        return new UserLive(new UserLiveId_1.UserLiveId(params.id), new UserId_1.UserId(params.userId), new UserLiveActive_1.UserLiveActive(params.active), new UserLiveStatus_1.UserLiveStatus('active'), new UserLiveExpirationDate_1.UserLiveExpirationDate(params.expirationDate), new UserLiveActiveDate_1.UserLiveActiveDate(params.activeDate), new CreatedAt_1.CreatedAt(new Date().toISOString()), new UpdatedAt_1.UpdatedAt(new Date().toISOString()));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            active: this._active.value,
            userId: this.userId.value,
            status: this._status.value,
            expirationDate: this._expirationDate.value,
            activeDate: this._activeDate.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
        };
    }
    activeLive() {
        this._status = new UserLiveStatus_1.UserLiveStatus('active');
    }
    holdingLive(time) {
        this._status = new UserLiveStatus_1.UserLiveStatus('holding');
        this._activeDate = new UserLiveActiveDate_1.UserLiveActiveDate(new Date().toISOString());
        const expirationDate = new Date().getTime() + time;
        this._expirationDate = new UserLiveExpirationDate_1.UserLiveExpirationDate(new Date(expirationDate).toISOString());
    }
    desactiveLive() {
        this._status = new UserLiveStatus_1.UserLiveStatus('inactive');
        this.record(new UserLiveStatusInactivedDomainEvent_1.UserLiveStatusInactivedDomainEvent({
            aggregateId: this.id.value,
            userId: this.userId.value,
        }));
    }
    isExpirated() {
        const expirationDate = new Date(this._expirationDate.value).getTime();
        const now = new Date().getTime();
        return expirationDate <= now;
    }
}
exports.UserLive = UserLive;
//# sourceMappingURL=UserLive.js.map