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
exports.CreatorFileAwsV2Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
let CreatorFileAwsV2Service = class CreatorFileAwsV2Service {
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({ region: 'REGION' });
    }
    async uploadFile(file, mimetype, folder) {
        const bucket = this.configService.get('AWS_PUBLIC_BUCKET_NAME');
        const params = {
            Bucket: bucket,
            Key: `${folder}/${String(Uuid_1.Uuid.random())}`,
            Body: file,
            ContentType: mimetype,
        };
        try {
            const data = await this.s3Client.send(new client_s3_1.PutObjectCommand(params));
            return data;
        }
        catch (err) {
            console.log('Error', err);
        }
    }
};
CreatorFileAwsV2Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CreatorFileAwsV2Service);
exports.CreatorFileAwsV2Service = CreatorFileAwsV2Service;
//# sourceMappingURL=creator-file-aws-v2.service.js.map