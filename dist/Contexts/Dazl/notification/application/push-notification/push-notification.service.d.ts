import { UserActivation } from '../../../user_activation/domain/UserActivation';
import { User } from '../../../users/domain/User';
import * as admin from 'firebase-admin';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../../users/domain/UserRepository';
import { UserId } from '../../../users/domain/UserId';
export declare class NotificationsService {
    private readonly firebaseAdmin;
    private readonly httpService;
    private readonly configService;
    private readonly userRepository;
    constructor(firebaseAdmin: admin.app.App, httpService: HttpService, configService: ConfigService, userRepository: UserRepository);
    private getAccessToken;
    sendNotificationReal(userActivation: UserActivation, user: User, message: {
        notification: {
            title: string;
            body: string;
        };
        data: {
            [key: string]: string;
        };
    }): Promise<void>;
    private sendFcmMessage;
    sendPushNotification(userId: UserId, token: string, message: {
        notification: {
            title: string;
            body: string;
        };
        data: {
            [key: string]: string;
        };
    }): Promise<void>;
}
