"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNamer = void 0;
const uuid_1 = require("uuid");
const fileNamer = (req, file, cb) => {
    if (!file)
        return cb(new Error('No file provided'), false);
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
    cb(null, fileName);
};
exports.fileNamer = fileNamer;
//# sourceMappingURL=fileNamer.helper.js.map