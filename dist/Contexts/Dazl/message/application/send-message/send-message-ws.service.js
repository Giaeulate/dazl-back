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
exports.SendMessageWsService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserId_1 = require("../../../users/domain/UserId");
let SendMessageWsService = class SendMessageWsService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.connectedClients = {};
    }
    async registerClient(client, userId) {
        const user = await this.userRepository.search(new UserId_1.UserId(userId));
        if (!user)
            throw new Error('User not found');
        this.checkUserConnection(user);
        this.connectedClients[client.id] = {
            socket: client,
            user: user,
        };
    }
    removeClient(clientId) {
        delete this.connectedClients[clientId];
    }
    getConnectedClients() {
        return Object.keys(this.connectedClients);
    }
    checkUserConnection(user) {
        for (const clientId of Object.keys(this.connectedClients)) {
            const connectedClient = this.connectedClients[clientId];
            if (connectedClient.user.id === user.id) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
};
SendMessageWsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], SendMessageWsService);
exports.SendMessageWsService = SendMessageWsService;
//# sourceMappingURL=send-message-ws.service.js.map