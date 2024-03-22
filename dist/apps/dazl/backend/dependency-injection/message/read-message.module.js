"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadMessageModule = void 0;
const common_1 = require("@nestjs/common");
const read_message_controller_1 = require("../../controllers/read-message.controller");
const read_message_service_1 = require("../../../../../Contexts/Dazl/message/application/read/read-message.service");
const finder_all_message_service_1 = require("../../../../../Contexts/Dazl/message/application/finder-all/finder-all-message.service");
const getter_unread_message_service_1 = require("../../../../../Contexts/Dazl/message/application/getter-unread/getter-unread-message.service");
const MessageDesactive_1 = require("../../../../../Contexts/Dazl/message/application/Desactive/MessageDesactive");
const PutMessageDesactiveController_1 = require("../../controllers/PutMessageDesactiveController");
let ReadMessageModule = class ReadMessageModule {
};
ReadMessageModule = __decorate([
    (0, common_1.Module)({
        controllers: [read_message_controller_1.ReadMessageController, PutMessageDesactiveController_1.PutMessageDesactiveController],
        providers: [
            read_message_service_1.ReadMessageService,
            finder_all_message_service_1.FinderAllMessageService,
            getter_unread_message_service_1.GetterUnreadMessageService,
            MessageDesactive_1.MessageDesactive,
        ],
    })
], ReadMessageModule);
exports.ReadMessageModule = ReadMessageModule;
//# sourceMappingURL=read-message.module.js.map