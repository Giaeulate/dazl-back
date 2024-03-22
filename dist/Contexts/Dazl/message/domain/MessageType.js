"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTypeEnum = exports.MessageType = void 0;
const StringValueObject_1 = require("../../../Shared/domain/value-object/StringValueObject");
class MessageType extends StringValueObject_1.StringValueObject {
    constructor(value) {
        super(value);
    }
}
exports.MessageType = MessageType;
var MessageTypeEnum;
(function (MessageTypeEnum) {
    MessageTypeEnum["TEXT"] = "text";
    MessageTypeEnum["IMAGE"] = "image";
    MessageTypeEnum["RESPONSE"] = "response";
    MessageTypeEnum["VIDEO"] = "video";
    MessageTypeEnum["AUDIO"] = "audio";
    MessageTypeEnum["FILE"] = "file";
})(MessageTypeEnum = exports.MessageTypeEnum || (exports.MessageTypeEnum = {}));
//# sourceMappingURL=MessageType.js.map