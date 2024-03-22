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
exports.Rekognition = void 0;
const client_rekognition_1 = require("@aws-sdk/client-rekognition");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let Rekognition = class Rekognition {
    constructor(configService) {
        this.configService = configService;
        this.client = new client_rekognition_1.RekognitionClient({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID_REK'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY_REK'),
            },
            maxAttempts: 3,
        });
    }
    async run(file, facesFlag, expliciteContent) {
        let faces;
        let strongContent;
        try {
            const command = new client_rekognition_1.DetectFacesCommand({
                Image: {
                    Bytes: new Uint8Array(file),
                },
                Attributes: ['ALL'],
            });
            const command2 = new client_rekognition_1.DetectModerationLabelsCommand({
                Image: {
                    Bytes: new Uint8Array(file),
                },
                MinConfidence: 50,
            });
            faces = await this.client.send(command);
            strongContent = await this.client.send(command2);
            console.log('Faces:', faces);
            console.log(faces.FaceDetails);
            console.log(strongContent);
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('No se pudo procesar la imagen.');
        }
        if (facesFlag) {
            this.ensureAreTheFaces(faces);
        }
        if (expliciteContent) {
            this.ensureNotStrongContent(strongContent);
        }
    }
    ensureAreTheFaces(faces) {
        if (faces.FaceDetails.length === 0) {
            throw new common_1.NotFoundException('Debes enviar una foto donde se vea al menos un rostro.');
        }
    }
    ensureNotStrongContent(strongContent) {
        const parentLabels = [
            'Explicit Nudity',
            'Violence',
            'Visually Disturbing',
            'Drugs',
            'Hate Symbols',
        ];
        const confidence = 95;
        const labels = strongContent.ModerationLabels.filter((label) => label.ParentName &&
            parentLabels.includes(label.ParentName) &&
            label.Confidence > confidence);
        if (labels.length > 0) {
            throw new common_1.NotFoundException('No puedes enviar imágenes con contenido explícito.');
        }
    }
};
Rekognition = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], Rekognition);
exports.Rekognition = Rekognition;
//# sourceMappingURL=Rekognition.js.map