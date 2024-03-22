"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const uuid_1 = require("uuid");
const ValueObject_1 = require("./ValueObject");
class Uuid extends ValueObject_1.ValueObject {
    constructor(value) {
        super(value);
    }
    static random() {
        return new Uuid((0, uuid_1.v4)());
    }
}
exports.Uuid = Uuid;
//# sourceMappingURL=Uuid.js.map