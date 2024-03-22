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
exports.GetCitiesByCountryController = void 0;
const common_1 = require("@nestjs/common");
const CityByCountrySearcher_1 = require("../../../../Contexts/Dazl/City/application/search-by-country/CityByCountrySearcher");
class QueryGetCitiesByCountry {
}
let GetCitiesByCountryController = class GetCitiesByCountryController {
    constructor(searcher) {
        this.searcher = searcher;
    }
    async run({ country_id }) {
        const array = await this.searcher.run({ countryId: country_id });
        return {
            status: true,
            message: 'City list',
            items: array.map((city) => city.toPrimitives()),
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryGetCitiesByCountry]),
    __metadata("design:returntype", Promise)
], GetCitiesByCountryController.prototype, "run", null);
GetCitiesByCountryController = __decorate([
    (0, common_1.Controller)('v1/city'),
    __metadata("design:paramtypes", [CityByCountrySearcher_1.CityByCountrySearcher])
], GetCitiesByCountryController);
exports.GetCitiesByCountryController = GetCitiesByCountryController;
//# sourceMappingURL=GetCitiesByCountryController.js.map