"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSuccessfulFormatResponse = void 0;
const FormatResponse_1 = require("./FormatResponse");
class NotSuccessfulFormatResponse extends FormatResponse_1.FormatResponse {
    constructor(items, statusCode = 400) {
        super(false, 'Bad Request', statusCode);
        this.items = items;
    }
}
exports.NotSuccessfulFormatResponse = NotSuccessfulFormatResponse;
//# sourceMappingURL=NotSuccessfulFormatResponse.js.map