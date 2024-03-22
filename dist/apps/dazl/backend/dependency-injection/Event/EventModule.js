"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const EventsActiveByLatLogGetter_1 = require("../../../../../Contexts/Dazl/Events/application/GetEventByLatLog/EventsActiveByLatLogGetter");
const GetEventsByLatLogController_1 = require("../../controllers/GetEventsByLatLogController");
let EventModule = class EventModule {
};
EventModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [EventsActiveByLatLogGetter_1.EventsActiveByLatLogGetter],
        controllers: [GetEventsByLatLogController_1.GetEventsByLatLogController],
        exports: [],
    })
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=EventModule.js.map