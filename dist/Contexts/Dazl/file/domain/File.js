"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const AggregateRoot_1 = require("../../../Shared/domain/AggregateRoot");
const FileId_1 = require("./FileId");
const FileName_1 = require("./FileName");
const FileContentType_1 = require("./FileContentType");
const FileLocation_1 = require("./FileLocation");
const CreatedAt_1 = require("../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../Shared/domain/UpdatedAt");
class File extends AggregateRoot_1.AggregateRoot {
    constructor(id, name, contentType, location) {
        super();
        this.id = id;
        this.name = name;
        this.contentType = contentType;
        this.location = location;
        this.createdAt = new CreatedAt_1.CreatedAt(new Date().toISOString());
        this.updatedAt = new UpdatedAt_1.UpdatedAt(new Date().toISOString());
    }
    static create(plainData) {
        const fileFromPrimitives = this.fromPrimitives(plainData);
        const file = new File(fileFromPrimitives.id, fileFromPrimitives.name, fileFromPrimitives.contentType, fileFromPrimitives.location);
        return file;
    }
    static fromPrimitives(plainData) {
        return new File(new FileId_1.FileId(plainData.id), new FileName_1.FileName(plainData.name), new FileContentType_1.FileContentType(plainData.contentType), new FileLocation_1.FileLocation(plainData.location));
    }
    toPrimitives() {
        var _a, _b, _c, _d, _e, _f;
        return {
            id: (_a = this.id) === null || _a === void 0 ? void 0 : _a.value,
            name: (_b = this.name) === null || _b === void 0 ? void 0 : _b.value,
            contentType: (_c = this.contentType) === null || _c === void 0 ? void 0 : _c.value,
            location: (_d = this.location) === null || _d === void 0 ? void 0 : _d.value,
            createdAt: (_e = this.createdAt) === null || _e === void 0 ? void 0 : _e.value,
            updatedAt: (_f = this.updatedAt) === null || _f === void 0 ? void 0 : _f.value,
        };
    }
}
exports.File = File;
//# sourceMappingURL=File.js.map