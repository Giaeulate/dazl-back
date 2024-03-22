"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class InvitationCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, userActivationFromId, userActivationToId, eventId, occurredOn, }) {
        super({
            eventName: InvitationCreatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.toPrimitives = () => {
            const { userActivationFromId, userActivationToId } = this;
            return {
                userActivationFromId,
                userActivationToId,
            };
        };
        this.userActivationFromId = userActivationFromId;
        this.userActivationToId = userActivationToId;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new InvitationCreatedDomainEvent({
            aggregateId,
            userActivationFromId: attributes.userActivationFromId,
            userActivationToId: attributes.userActivationToId,
            eventId,
            occurredOn,
        });
    }
}
exports.InvitationCreatedDomainEvent = InvitationCreatedDomainEvent;
InvitationCreatedDomainEvent.EVENT_NAME = 'invitation.created';
//# sourceMappingURL=InvitationCreatedDomainEvent.js.map