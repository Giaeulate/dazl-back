"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const InvitationId_1 = require("./InvitationId");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
const InvitationStatus_1 = require("./InvitationStatus");
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const InvitationCreatedDomainEvent_1 = require("./InvitationCreatedDomainEvent");
const UserActivationId_1 = require("../../user_activation/domain/UserActivationId");
const InvitationStatusAcceptedChangedDomainEvent_1 = require("./InvitationStatusAcceptedChangedDomainEvent");
class Invitation extends AggregateRoot_1.AggregateRoot {
    get status() {
        return this._status;
    }
    cancel() {
        this._status = new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.CANCEL);
    }
    constructor(id, userActivationFromId, userActivationToId) {
        super();
        this.id = id;
        this.userActivationFromId = userActivationFromId;
        this.userActivationToId = userActivationToId;
        this._status = new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.PENDING);
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    static create(plainData) {
        const invitationFromPrimitives = Invitation.fromPrimitives(plainData);
        const invitation = new Invitation(invitationFromPrimitives.id, invitationFromPrimitives.userActivationFromId, invitationFromPrimitives.userActivationToId);
        invitation.record(new InvitationCreatedDomainEvent_1.InvitationCreatedDomainEvent({
            aggregateId: invitation.id.value,
            userActivationFromId: invitation.userActivationFromId.value,
            userActivationToId: invitation.userActivationToId.value,
        }));
        return invitation;
    }
    static fromPrimitives(plainData) {
        return new Invitation(new InvitationId_1.InvitationId(plainData.id), new UserActivationId_1.UserActivationId(plainData.userActivationFromId), new UserActivationId_1.UserActivationId(plainData.userActivationToId));
    }
    toPrimitives() {
        var _a, _b, _c, _d, _e, _f;
        return {
            id: (_a = this.id) === null || _a === void 0 ? void 0 : _a.value,
            userActivationFromId: (_b = this.userActivationFromId) === null || _b === void 0 ? void 0 : _b.value,
            userActivationToId: (_c = this.userActivationToId) === null || _c === void 0 ? void 0 : _c.value,
            status: (_d = this._status) === null || _d === void 0 ? void 0 : _d.value,
            createdAt: (_e = this.createdAt) === null || _e === void 0 ? void 0 : _e.value,
            updatedAt: (_f = this.updatedAt) === null || _f === void 0 ? void 0 : _f.value,
        };
    }
    accept() {
        this._status = new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.ACCEPTED);
        this.record(new InvitationStatusAcceptedChangedDomainEvent_1.InvitationStatusAcceptedChangedDomainEvent({
            aggregateId: this.id.value,
            userActivationFromId: this.userActivationFromId.value,
            userActivationToId: this.userActivationToId.value,
        }));
    }
    set status(value) {
        this._status = value;
    }
    reject() {
        this._status = new InvitationStatus_1.InvitationStatus(InvitationStatus_1.InvitationStatusEnum.REJECTED);
    }
}
exports.Invitation = Invitation;
//# sourceMappingURL=Invitation.js.map