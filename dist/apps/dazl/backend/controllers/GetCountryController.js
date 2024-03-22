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
exports.GetCountryController = void 0;
const common_1 = require("@nestjs/common");
const CountryAllSearcher_1 = require("../../../../Contexts/Dazl/country/application/search-all/CountryAllSearcher");
let GetCountryController = class GetCountryController {
    constructor(searcher) {
        this.searcher = searcher;
    }
    async run() {
        const array = await this.searcher.run();
        return {
            status: true,
            message: 'Country list',
            items: array.map((country) => country.toPrimitives()),
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GetCountryController.prototype, "run", null);
GetCountryController = __decorate([
    (0, common_1.Controller)('v1/country'),
    __metadata("design:paramtypes", [CountryAllSearcher_1.CountryAllSearcher])
], GetCountryController);
exports.GetCountryController = GetCountryController;
//# sourceMappingURL=GetCountryController.js.map