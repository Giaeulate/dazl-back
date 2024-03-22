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
exports.UserCreatorService = void 0;
const common_1 = require("@nestjs/common");
const User_1 = require("../../domain/User");
const bcrypt = require("bcrypt");
const UserEmail_1 = require("../../domain/UserEmail");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const UserLiveByUserCreator_1 = require("../../../user-live/application/create-by-user/UserLiveByUserCreator");
const Uuid_1 = require("../../../../Shared/domain/value-object/Uuid");
let UserCreatorService = class UserCreatorService {
    constructor(userRepository, eventBus, userLiveByUserCreator) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
        this.userLiveByUserCreator = userLiveByUserCreator;
    }
    async run(request) {
        await this.ensureEmailNotExists(new UserEmail_1.UserEmail(request.email));
        const id = Uuid_1.Uuid.random().value;
        const user = User_1.User.create({
            id,
            firstName: request.firstName,
            lastName: request.lastName,
            gender: request.gender,
            age: request.age,
            name: request.name,
            email: request.email,
            password: bcrypt.hashSync(request.password, 10),
            popularity: 0,
            confirmationCode: '',
            confirmationTime: new Date().toDateString(),
            status: request.status,
            latitude: request.latitude,
            longitude: request.longitude,
            tokenFirebase: '',
            activeDate: new Date().toDateString(),
            expirationDate: new Date().toDateString(),
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });
        await this.userRepository.save(user);
        await this.eventBus.publish(user.pullDomainEvents());
        await this.createNumberUserLive(id);
        console.log('user live created');
    }
    async ensureEmailNotExists(userEmail) {
        const user = await this.userRepository.searchByEmail(userEmail);
        if (!user)
            return;
        if (user.isActiveEmail())
            throw new common_1.BadRequestException('El correo ya existe, el usuario esta activo');
        else if (user)
            throw new common_1.BadRequestException('El correo ya existe');
    }
    async createNumberUserLive(userId) {
        await this.userLiveByUserCreator.run({
            userId: userId,
        });
    }
};
UserCreatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.EVENT_BUS)),
    __metadata("design:paramtypes", [Object, Object, UserLiveByUserCreator_1.UserLiveByUserCreator])
], UserCreatorService);
exports.UserCreatorService = UserCreatorService;
//# sourceMappingURL=user-creator.service.js.map