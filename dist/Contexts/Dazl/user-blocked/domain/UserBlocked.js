"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlocked = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const UserId_1 = require("../../users/domain/UserId");
const UserBlockedId_1 = require("./UserBlockedId");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const UserBlockedActive_1 = require("./UserBlockedActive");
class UserBlocked extends AggregateRoot_1.AggregateRoot {
    set active(value) {
        this._active = value;
    }
    set updatedAt(value) {
        this._updatedAt = value;
    }
    constructor(id, userBlocked, userWhoBlocked, active, createdAt, updatedAt) {
        super();
        this.id = id;
        this.userBlocked = userBlocked;
        this.userWhoBlocked = userWhoBlocked;
        this._active = active;
        this.createdAt = createdAt;
        this._updatedAt = updatedAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    get active() {
        return this._active;
    }
    static create(params) {
        return new UserBlocked(new UserBlockedId_1.UserBlockedId(params.id), new UserId_1.UserId(params.userBlocked), new UserId_1.UserId(params.userWhoBlocked), new UserBlockedActive_1.UserBlockedActive(1), new CreatedAt_1.CreatedAt(new Date().toISOString()), new UpdatedAt_1.UpdatedAt(new Date().toISOString()));
    }
    toPrimitives() {
        return {
            id: this.id.value,
            userBlocked: this.userBlocked.value,
            userWhoBlocked: this.userWhoBlocked.value,
            createdAt: this.createdAt.value,
            updatedAt: this._updatedAt.value,
        };
    }
    isActive() {
        console.log(this._active.value);
        console.log(this._active.value === 1);
        return this._active.value === 1;
    }
    unblock() {
        this._active = new UserBlockedActive_1.UserBlockedActive(0);
        this._updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
}
exports.UserBlocked = UserBlocked;
//# sourceMappingURL=UserBlocked.js.map