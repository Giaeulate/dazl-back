"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoUserPostModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const photo_user_post_controller_1 = require("../../controllers/photo-user-post.controller");
const creator_file_aws_service_1 = require("../../../../../Contexts/Dazl/file/application/creator-file-aws/creator-file-aws.service");
const upload_user_image_service_1 = require("../../../../../Contexts/Dazl/file/application/creator/upload-user-image.service");
let PhotoUserPostModule = class PhotoUserPostModule {
};
PhotoUserPostModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [upload_user_image_service_1.UploadUserImageService, creator_file_aws_service_1.CreatorFileAwsService],
        controllers: [photo_user_post_controller_1.PhotoUserPostController],
    })
], PhotoUserPostModule);
exports.PhotoUserPostModule = PhotoUserPostModule;
//# sourceMappingURL=photo-user-post.module.js.map