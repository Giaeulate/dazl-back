"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationStatusEnum = exports.InvitationStatus = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
class InvitationStatus extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
    }
}
exports.InvitationStatus = InvitationStatus;
var InvitationStatusEnum;
(function (InvitationStatusEnum) {
    InvitationStatusEnum["PENDING"] = "PENDING";
    InvitationStatusEnum["ACCEPTED"] = "ACCEPTED";
    InvitationStatusEnum["REJECTED"] = "REJECTED";
    InvitationStatusEnum["CANCEL"] = "CANCEL";
})(InvitationStatusEnum = exports.InvitationStatusEnum || (exports.InvitationStatusEnum = {}));
//# sourceMappingURL=InvitationStatus.js.map