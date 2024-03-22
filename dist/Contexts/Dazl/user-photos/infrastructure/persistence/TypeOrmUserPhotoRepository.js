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
exports.TypeOrmUserPhotoRepository = void 0;
const TypeOrmRepository_1 = require("../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository");
const typeorm_1 = require("typeorm");
const UserPhotoEntity_1 = require("./typeorm/UserPhotoEntity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const UserPhotoActive_1 = require("../../domain/UserPhotoActive");
let TypeOrmUserPhotoRepository = class TypeOrmUserPhotoRepository extends TypeOrmRepository_1.TypeOrmRepository {
    constructor(dataSource) {
        super(dataSource);
        this.dataSource = dataSource;
    }
    entitySchema() {
        return UserPhotoEntity_1.UserPhotoEntity;
    }
    async matching(criteria) {
        return Promise.resolve(undefined);
    }
    async save(userPhoto) {
        await this.persist(userPhoto);
    }
    async search(id) {
        const repository = await this.repository();
        const userPhoto = await repository.findOneBy({
            id: (0, typeorm_1.Equal)(id),
            active: (0, typeorm_1.Equal)(new UserPhotoActive_1.UserPhotoActive(true)),
        });
        return userPhoto ? userPhoto : null;
    }
    async searchAll() {
        const repository = await this.repository();
        return await repository.find({
            where: { active: (0, typeorm_1.Equal)(new UserPhotoActive_1.UserPhotoActive(true)) },
        });
    }
    async deleteFile(fileId) {
        const repository = await this.repository();
        const userPhotoFind = await repository.findOneBy({
            photo: (0, typeorm_1.Equal)(fileId),
        });
        if (userPhotoFind) {
            userPhotoFind.active = new UserPhotoActive_1.UserPhotoActive(false);
            await repository.save(userPhotoFind);
        }
    }
};
TypeOrmUserPhotoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TypeOrmUserPhotoRepository);
exports.TypeOrmUserPhotoRepository = TypeOrmUserPhotoRepository;
//# sourceMappingURL=TypeOrmUserPhotoRepository.js.map