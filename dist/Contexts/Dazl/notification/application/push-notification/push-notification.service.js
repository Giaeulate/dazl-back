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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const constants_1 = require("../../../../../apps/dazl/backend/dependency-injection/constants/constants");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const constants_2 = require("../../../../Shared/domain/constants/constants");
const UserBadge_1 = require("../../../users/domain/UserBadge");
const googleapis_1 = require("googleapis");
const https = require("https");
let NotificationsService = class NotificationsService {
    constructor(firebaseAdmin, httpService, configService, userRepository) {
        this.firebaseAdmin = firebaseAdmin;
        this.httpService = httpService;
        this.configService = configService;
        this.userRepository = userRepository;
    }
    getAccessToken() {
        return new Promise((resolve, reject) => {
            const MESSAGING_SCOPE = `https://www.googleapis.com/auth/firebase.messaging`;
            const SCOPES = [MESSAGING_SCOPE];
            const key = require(`./push-notification-google-service.json`);
            const jwtClient = new googleapis_1.google.auth.JWT(key.client_email, null, key.private_key, SCOPES, null);
            jwtClient.authorize(function (err, tokens) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(tokens.access_token);
            });
        });
    }
    async sendNotificationReal(userActivation, user, message) {
        await this.sendPushNotification(user.id, user.tokenFirebase.value, message);
    }
    sendFcmMessage({ fcmMessage }) {
        const PROJECT_ID = '<YOUR-PROJECT-ID>';
        const HOST = 'fcm.googleapis.com';
        const PATH = '/v1/projects/' + PROJECT_ID + '/messages:send';
        this.getAccessToken().then((accessToken) => {
            console.log('accessToken', accessToken);
            const options = {
                hostname: HOST,
                path: PATH,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            };
            const request = https.request(options, (resp) => {
                resp.setEncoding('utf8');
                resp.on('data', (data) => {
                    console.log('Message sent to Firebase for delivery, response:');
                    console.log(data);
                });
            });
            request.on('error', (err) => {
                console.log('Unable to send message to Firebase');
                console.log(err);
            });
            request.write(JSON.stringify(fcmMessage));
            request.end();
        });
    }
    async sendPushNotification(userId, token, message) {
        const userBadge = await this.userRepository.search(userId);
        userBadge.badge = new UserBadge_1.UserBadge(userBadge.badge.value + 1);
        await this.userRepository.save(userBadge);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${this.configService.get('FIREBASE_KEY')}`,
            },
        };
        const body = {
            notification: Object.assign(Object.assign({}, message.notification), { sound: 'default' }),
            to: token,
            data: message.data,
            sound: 'dazl_notification_sound',
            vibrate: 1,
            priority: 'high',
            apns: {
                payload: {
                    aps: {
                        'mutable-content': 1,
                        sound: 'dazl_notification_sound',
                    },
                },
            },
        };
        this.httpService
            .post('https://fcm.googleapis.com/fcm/send', body, config)
            .pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.tap)((response) => console.log('NotificationsService', response)))
            .subscribe();
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ConstantsFirebase.FIREBASE_ADMIN)),
    __param(3, (0, common_1.Inject)(constants_2.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService,
        config_1.ConfigService, Object])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=push-notification.service.js.map