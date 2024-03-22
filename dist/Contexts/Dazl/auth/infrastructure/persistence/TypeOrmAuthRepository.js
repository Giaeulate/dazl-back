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
var TypeOrmAuthRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmAuthRepository = void 0;
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("../../../users/infrastructure/persistence/typeorm/UserEntity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const UserActive_1 = require("../../../users/domain/UserActive");
let TypeOrmAuthRepository = TypeOrmAuthRepository_1 = class TypeOrmAuthRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
        this.logger = new common_1.Logger(TypeOrmAuthRepository_1.name);
    }
    entitySchema() {
        return UserEntity_1.UserEntity;
    }
    async search(email) {
        const repository = await this.repository();
        const user = await repository.findOne({
            select: ['id', 'email', 'gender', 'password', 'isEmailConfirmed'],
            where: {
                email: new typeorm_1.EqualOperator(email),
                active: (0, typeorm_1.Equal)(UserActive_1.UserActive.active()),
            },
        });
        return user ? user : null;
    }
};
TypeOrmAuthRepository = TypeOrmAuthRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmAuthRepository);
exports.TypeOrmAuthRepository = TypeOrmAuthRepository;
//# sourceMappingURL=TypeOrmAuthRepository.js.map