"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatorFileAwsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
let CreatorFileAwsService = class CreatorFileAwsService {
    constructor(configService) {
        this.configService = configService;
        this.bucket = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
        });
    }
    async uploadFile(file, mimetype, folder, uuid) {
        return await this.s3Upload(file, folder, uuid);
    }
    async s3Upload(file, folder, uuid) {
        const params = {
            Bucket: this.bucket,
            Key: `${folder}/${uuid}-${Date.now()}.jpg`,
            Body: file,
            ContentType: 'image/jpeg',
        };
        try {
            return await this.s3.upload(params).promise();
        }
        catch (e) {
            return;
        }
    }
};
CreatorFileAwsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CreatorFileAwsService);
exports.CreatorFileAwsService = CreatorFileAwsService;
//# sourceMappingURL=creator-file-aws.service.js.map