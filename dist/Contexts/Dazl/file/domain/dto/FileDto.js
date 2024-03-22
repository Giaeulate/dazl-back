"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDto = void 0;
class FileDto {
    constructor(file) {
        this.id = file.id.value;
        this.name = file.name.value;
        this.contentType = file.contentType.value;
        this.location = file.location.value;
        this.createdAt = file.createdAt.value;
        this.updatedAt = file.updatedAt.value;
    }
}
exports.FileDto = FileDto;
//# sourceMappingURL=FileDto.js.map