"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessor = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
let ImageProcessor = class ImageProcessor {
    async processImage(image) {
        const compressedImage = (await sharp(image)
            .toFormat('jpeg')
            .toBuffer());
        const thumbnailImage = (await sharp(compressedImage)
            .toFormat('jpeg')
            .resize({ width: 800 })
            .toBuffer());
        const smallImage = (await sharp(compressedImage)
            .toFormat('jpeg')
            .resize({ width: 200 })
            .toBuffer());
        return { thumbnail: thumbnailImage, small: smallImage };
    }
};
ImageProcessor = __decorate([
    (0, common_1.Injectable)()
], ImageProcessor);
exports.ImageProcessor = ImageProcessor;
//# sourceMappingURL=ImageProcessor.js.map