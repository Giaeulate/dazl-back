"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeometricCalculatorService = void 0;
const common_1 = require("@nestjs/common");
let GeometricCalculatorService = class GeometricCalculatorService {
    constructor() {
        this.calculateDistanceBetweenPoints = (latitudeA, longitudeA, latitudeB, longitudeB) => {
            const earthRadius = 6371;
            const dLat = this.deg2rad(latitudeB - latitudeA);
            const dLon = this.deg2rad(longitudeB - longitudeA);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(latitudeA)) *
                    Math.cos(this.deg2rad(latitudeB)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return (earthRadius * c) / 0.001;
        };
        this.deg2rad = (number) => (number * Math.PI) / 180;
    }
    isInsideRadio(latitude, longitude, latitude2, longitude2, meters) {
        const distance = this.calculateDistanceBetweenPoints(latitude, longitude, latitude2, longitude2);
        return distance <= meters;
    }
};
GeometricCalculatorService = __decorate([
    (0, common_1.Injectable)()
], GeometricCalculatorService);
exports.GeometricCalculatorService = GeometricCalculatorService;
//# sourceMappingURL=geometric-calculator.service.js.map