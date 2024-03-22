"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
const InvalidArgumentError_1 = require("../../../Shared/domain/value-object/InvalidArgumentError");
class UserPassword extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
        this.value = value;
        this.ensurePasswordIsValid(value);
        this.ensurePasswordHasUpperCase(value);
    }
    ensurePasswordIsValid(value) {
        if (value.length < 8) {
            throw new InvalidArgumentError_1.InvalidArgumentError(`The User Password <${value}> has less than 8 characters`);
        }
    }
    ensurePasswordHasUpperCase(value) {
        if (!value.match(/[A-Z]/)) {
            throw new InvalidArgumentError_1.InvalidArgumentError(`The User Password <${value}> does not have an upper case letter`);
        }
    }
}
exports.UserPassword = UserPassword;
//# sourceMappingURL=UserPassword.js.map