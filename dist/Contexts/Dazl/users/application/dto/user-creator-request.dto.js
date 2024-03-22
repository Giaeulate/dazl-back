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
exports.UserCreatorRequestDto = void 0;
const class_validator_1 = require("class-validator");
class UserCreatorRequestDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido es requerido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El género es requerido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La edad es requerido' }),
    __metadata("design:type", Number)
], UserCreatorRequestDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerida' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El email no es válido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La confirmación de la contraseña es requerido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La latitud es requerido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La longitud es requerido' }),
    __metadata("design:type", String)
], UserCreatorRequestDto.prototype, "longitude", void 0);
exports.UserCreatorRequestDto = UserCreatorRequestDto;
//# sourceMappingURL=user-creator-request.dto.js.map