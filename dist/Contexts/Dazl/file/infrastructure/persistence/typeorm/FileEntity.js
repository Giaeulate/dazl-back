"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = void 0;
const typeorm_1 = require("typeorm");
const File_1 = require("../../../domain/File");
const ValueObjectTransformer_1 = require("../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer");
const FileId_1 = require("../../../domain/FileId");
const FileName_1 = require("../../../domain/FileName");
const FileContentType_1 = require("../../../domain/FileContentType");
const FileLocation_1 = require("../../../domain/FileLocation");
const CreatedAt_1 = require("../../../../../Shared/domain/CreatedAt");
const UpdatedAt_1 = require("../../../../../Shared/domain/UpdatedAt");
exports.FileEntity = new typeorm_1.EntitySchema({
    name: 'File',
    tableName: 'file',
    target: File_1.File,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(FileId_1.FileId),
        },
        name: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(FileName_1.FileName),
        },
        contentType: {
            name: 'content_type',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(FileContentType_1.FileContentType),
        },
        location: {
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(FileLocation_1.FileLocation),
        },
        createdAt: {
            name: 'created_at',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(CreatedAt_1.CreatedAt),
        },
        updatedAt: {
            name: 'updated_at',
            type: String,
            transformer: (0, ValueObjectTransformer_1.ValueObjectTransformer)(UpdatedAt_1.UpdatedAt),
        },
    },
});
//# sourceMappingURL=FileEntity.js.map