"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageNotExist = void 0;
const common_1 = require("@nestjs/common");
class MessageNotExist {
    constructor(messageId) {
        throw new common_1.NotFoundException(`Message with id <${messageId.value}> does not exist`);
    }
}
exports.MessageNotExist = MessageNotExist;
//# sourceMappingURL=MessageNotExist.js.map