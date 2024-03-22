"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsEmailConfirmed = void 0;
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class UserIsEmailConfirmed extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
    }
    static confirmed() {
        return new UserIsEmailConfirmed(1);
    }
}
exports.UserIsEmailConfirmed = UserIsEmailConfirmed;
//# sourceMappingURL=UserIsEmailConfirmed.js.map