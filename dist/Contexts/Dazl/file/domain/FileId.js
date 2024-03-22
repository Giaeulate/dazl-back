"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileId = void 0;
const Uuid_1 = require("../../../Shared/domain/value-object/Uuid");
class FileId extends Uuid_1.Uuid {
    constructor(value) {
        super(value);
    }
}
exports.FileId = FileId;
//# sourceMappingURL=FileId.js.map