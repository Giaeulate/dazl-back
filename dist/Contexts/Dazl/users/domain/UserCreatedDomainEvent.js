"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedDomainEvent = void 0;
const DomainEvent_1 = require("../../../Shared/domain/bus/event/DomainEvent");
class UserCreatedDomainEvent extends DomainEvent_1.DomainEvent {
    constructor({ aggregateId, email, eventId, occurredOn, emailConfirmationCode, }) {
        super({
            eventName: UserCreatedDomainEvent.EVENT_NAME,
            aggregateId,
            eventId,
            occurredOn,
        });
        this.toPrimitives = () => {
            const { email } = this;
            return {
                email,
                emailConfirmationCode: this.emailConfirmationCode,
            };
        };
        this.emailConfirmationCode = emailConfirmationCode;
        this.email = email;
    }
    static fromPrimitives(params) {
        const { aggregateId, attributes, occurredOn, eventId } = params;
        return new UserCreatedDomainEvent({
            aggregateId,
            email: attributes.email,
            eventId,
            occurredOn,
            emailConfirmationCode: attributes.emailConfirmationCode,
        });
    }
}
exports.UserCreatedDomainEvent = UserCreatedDomainEvent;
UserCreatedDomainEvent.EVENT_NAME = 'user.created';
//# sourceMappingURL=UserCreatedDomainEvent.js.map