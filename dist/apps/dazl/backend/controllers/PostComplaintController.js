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
exports.PostComplaintController = void 0;
const common_1 = require("@nestjs/common");
const CreatorComplaint_1 = require("../../../../Contexts/Dazl/complaint/application/Creator/CreatorComplaint");
const SuccessfulFormatResponse_1 = require("../../../../Contexts/Shared/domain/response/SuccessfulFormatResponse");
const passport_1 = require("@nestjs/passport");
class PostBody {
}
let PostComplaintController = class PostComplaintController {
    constructor(creatorComplaint) {
        this.creatorComplaint = creatorComplaint;
    }
    async run(postBody) {
        console.log('postBody', postBody);
        return new SuccessfulFormatResponse_1.SuccessfulFormatResponse(await this.creatorComplaint.run(postBody));
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostBody]),
    __metadata("design:returntype", Promise)
], PostComplaintController.prototype, "run", null);
PostComplaintController = __decorate([
    (0, common_1.Controller)('complaint'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [CreatorComplaint_1.CreatorComplaint])
], PostComplaintController);
exports.PostComplaintController = PostComplaintController;
//# sourceMappingURL=PostComplaintController.js.map