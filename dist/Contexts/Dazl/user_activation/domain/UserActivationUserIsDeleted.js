"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivationUserIsDeleted = void 0;
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class UserActivationUserIsDeleted extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
    }
    static available() {
        return new UserActivationUserIsDeleted(0);
    }
    static deleted() {
        return new UserActivationUserIsDeleted(1);
    }
    isAvailable() {
        return this.value === 0;
    }
}
exports.UserActivationUserIsDeleted = UserActivationUserIsDeleted;
//# sourceMappingURL=UserActivationUserIsDeleted.js.map