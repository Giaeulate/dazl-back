"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationIsTheLocatorActivated = void 0;
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class UserActivationIsTheLocatorActivated extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
    }
    isActivated() {
        return this.value === 1;
    }
}
exports.UserActivationIsTheLocatorActivated = UserActivationIsTheLocatorActivated;
//# sourceMappingURL=UserActivationIsTheLocatorActivated.js.map