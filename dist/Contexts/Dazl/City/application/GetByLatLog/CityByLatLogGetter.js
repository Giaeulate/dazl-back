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
exports.CityByLatLogGetter = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../Shared/domain/constants/constants");
const geometric_calculator_service_1 = require("../../../Shared/application/calculator-if-within-radius/geometric-calculator.service");
let CityByLatLogGetter = class CityByLatLogGetter {
    constructor(cityRepository, calculatorService) {
        this.cityRepository = cityRepository;
        this.calculatorService = calculatorService;
    }
    async run({ lat, log }) {
        const cities = await this.cityRepository.searchAll();
        console.log('cities', cities);
        return cities.reduce((prev, curr) => this.searchCityByLatLong(prev, curr, lat, log), undefined);
    }
    searchCityByLatLong(prev, curr, latitud, longitud) {
        if (prev) {
            const distancePrev = this.calculatorService.calculateDistanceBetweenPoints(Number(latitud.value), Number(longitud.value), Number(prev.latitude.value), Number(prev.longitude.value));
            const distanceCurr = this.calculatorService.calculateDistanceBetweenPoints(Number(latitud.value), Number(longitud.value), Number(curr.latitude.value), Number(curr.longitude.value));
            return distancePrev < distanceCurr ? prev : curr;
        }
        else {
            return curr;
        }
    }
};
CityByLatLogGetter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CITY_REPOSITORY)),
    __metadata("design:paramtypes", [Object, geometric_calculator_service_1.GeometricCalculatorService])
], CityByLatLogGetter);
exports.CityByLatLogGetter = CityByLatLogGetter;
//# sourceMappingURL=CityByLatLogGetter.js.map