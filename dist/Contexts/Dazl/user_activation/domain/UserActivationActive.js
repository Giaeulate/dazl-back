"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationActive = void 0;
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class UserActivationActive extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
        this.value = value;
    }
    isActive() {
        return this.value === 1;
    }
}
exports.UserActivationActive = UserActivationActive;
//# sourceMappingURL=UserActivationActive.js.map