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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutMessageDesactiveController = void 0;
const common_1 = require("@nestjs/common");
const MessageDesactive_1 = require("../../../../Contexts/Dazl/message/application/Desactive/MessageDesactive");
let PutMessageDesactiveController = class PutMessageDesactiveController {
    constructor(desactive) {
        this.desactive = desactive;
    }
    async run(token, queries, params) {
        console.log('PutMessageDesactiveController', queries);
        console.log('PutMessageDesactiveController', params);
        await this.desactive.run({
            messageId: params.id,
            userActivationId: queries.user_activation_id,
        });
        return {
            status: true,
            statusCode: 200,
            message: 'Message desactive',
            error: null,
        };
    }
};
__decorate([
    (0, common_1.Put)(':id/desactive'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PutMessageDesactiveController.prototype, "run", null);
PutMessageDesactiveController = __decorate([
    (0, common_1.Controller)('v1/messages'),
    __metadata("design:paramtypes", [MessageDesactive_1.MessageDesactive])
], PutMessageDesactiveController);
exports.PutMessageDesactiveController = PutMessageDesactiveController;
//# sourceMappingURL=PutMessageDesactiveController.js.map