"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsTime = exports.TimeActivation = void 0;
var TimeActivation;
(function (TimeActivation) {
    TimeActivation[TimeActivation["ACTIVATION_TIME"] = 28800000] = "ACTIVATION_TIME";
    TimeActivation[TimeActivation["LIVES"] = 3] = "LIVES";
    TimeActivation[TimeActivation["REACTIVE_LIVES"] = 3600000] = "REACTIVE_LIVES";
})(TimeActivation = exports.TimeActivation || (exports.TimeActivation = {}));
var ChatsTime;
(function (ChatsTime) {
    ChatsTime[ChatsTime["CHAT_TIME_5_MIN"] = 1500000] = "CHAT_TIME_5_MIN";
    ChatsTime[ChatsTime["CHAT_TIME"] = 1800000] = "CHAT_TIME";
    ChatsTime[ChatsTime["CHAT_REMEMBER_TIME"] = 300000] = "CHAT_REMEMBER_TIME";
    ChatsTime[ChatsTime["CHAT_POSTPONE_TIME"] = 300000] = "CHAT_POSTPONE_TIME";
})(ChatsTime = exports.ChatsTime || (exports.ChatsTime = {}));
//# sourceMappingURL=TimeActivation.js.map