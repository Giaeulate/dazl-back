"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAge = void 0;
const IntValueObject_1 = require("../../../Shared/domain/value-object/IntValueObject");
class UserAge extends IntValueObject_1.NumberValueObject {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.UserAge = UserAge;
//# sourceMappingURL=UserAge.js.map