"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintModule = void 0;
const common_1 = require("@nestjs/common");
const PostComplaintController_1 = require("../../controllers/PostComplaintController");
const CreatorComplaint_1 = require("../../../../../Contexts/Dazl/complaint/application/Creator/CreatorComplaint");
let ComplaintModule = class ComplaintModule {
};
ComplaintModule = __decorate([
    (0, common_1.Module)({
        providers: [CreatorComplaint_1.CreatorComplaint],
        controllers: [PostComplaintController_1.PostComplaintController],
    })
], ComplaintModule);
exports.ComplaintModule = ComplaintModule;
//# sourceMappingURL=ComplaintModule.js.map