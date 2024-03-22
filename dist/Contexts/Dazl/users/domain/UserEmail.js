"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
const InvalidArgumentError_1 = require("../../../Shared/domain/value-object/InvalidArgumentError");
class UserEmail extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
        this.value = value;
        this.ensureValueIsEmail(value);
    }
    ensureValueIsEmail(value) {
        if (!value.includes('@')) {
            throw new InvalidArgumentError_1.InvalidArgumentError(`The User Email <${value}> is not a valid email`);
        }
    }
}
exports.UserEmail = UserEmail;
//# sourceMappingURL=UserEmail.js.map