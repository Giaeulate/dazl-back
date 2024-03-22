"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActiveHistoryStatusEnum = exports.UserActiveHistoryStatus = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
class UserActiveHistoryStatus extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
        this.value = value;
    }
}
exports.UserActiveHistoryStatus = UserActiveHistoryStatus;
var UserActiveHistoryStatusEnum;
(function (UserActiveHistoryStatusEnum) {
    UserActiveHistoryStatusEnum["HOLDING"] = "holding";
    UserActiveHistoryStatusEnum["CLOSED"] = "closed";
})(UserActiveHistoryStatusEnum = exports.UserActiveHistoryStatusEnum || (exports.UserActiveHistoryStatusEnum = {}));
//# sourceMappingURL=UserActiveHistoryStatus.js.map