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
exports.UserActivationIsActiveSocketService = void 0;
const common_1 = require("@nestjs/common");
const finder_user_activation_socket_id_service_1 = require("../finder-socket-id/finder-user-activation-socket-id.service");
const constants_1 = require("../../../../Shared/domain/constants/constants");
let UserActivationIsActiveSocketService = class UserActivationIsActiveSocketService {
    constructor(userActivationRepository, finderUserActivationSocketIdService) {
        this.userActivationRepository = userActivationRepository;
        this.finderUserActivationSocketIdService = finderUserActivationSocketIdService;
        this.run = async ({ userActivationSocketId, isActiveSocket, }) => {
            const userActivation = await this.finderUserActivationSocketIdService.run(userActivationSocketId);
            userActivation.isActiveSocket = isActiveSocket;
            await this.userActivationRepository.save(userActivation);
        };
    }
};
UserActivationIsActiveSocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_ACTIVATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object, finder_user_activation_socket_id_service_1.FinderUserActivationSocketIdService])
], UserActivationIsActiveSocketService);
exports.UserActivationIsActiveSocketService = UserActivationIsActiveSocketService;
//# sourceMappingURL=user-activation-is-active-socket.service.js.map