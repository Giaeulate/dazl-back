"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActive = void 0;
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class UserActive extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
    }
    static active() {
        return new UserActive(1);
    }
    static inactive() {
        return new UserActive(0);
    }
    isActive() {
        return this.value === 1;
    }
    isInactive() {
        return this.value === 0;
    }
}
exports.UserActive = UserActive;
//# sourceMappingURL=UserActive.js.map