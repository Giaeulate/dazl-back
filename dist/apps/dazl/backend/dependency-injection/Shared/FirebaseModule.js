"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const serviceAccount = require("../../../../../push-notification-google-service.json");
const constants_1 = require("../constants/constants");
const firebaseConfig = {
    provide: constants_1.ConstantsFirebase.FIREBASE_ADMIN,
    useFactory: () => {
        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    },
};
let FirebaseModule = class FirebaseModule {
};
FirebaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [firebaseConfig],
        exports: [constants_1.ConstantsFirebase.FIREBASE_ADMIN],
    })
], FirebaseModule);
exports.FirebaseModule = FirebaseModule;
//# sourceMappingURL=FirebaseModule.js.map