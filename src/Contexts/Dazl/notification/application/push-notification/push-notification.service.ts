import { Inject, Injectable } from '@nestjs/common';
import { UserActivation } from '../../../user_activation/domain/UserActivation';
import { User } from '../../../users/domain/User';
import * as admin from 'firebase-admin';
import { ConstantsFirebase } from '../../../../../apps/dazl/backend/dependency-injection/constants/constants';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { map, tap } from 'rxjs';
import { USER_REPOSITORY } from '../../../../Shared/domain/constants/constants';
import { UserRepository } from '../../../users/domain/UserRepository';
import { UserBadge } from '../../../users/domain/UserBadge';
import { UserId } from '../../../users/domain/UserId';
import { google } from 'googleapis';
import * as https from 'https';

@Injectable()
export class NotificationsService {
  constructor(
    // private readonly moduleGateway: ModuleGateway,
    @Inject(ConstantsFirebase.FIREBASE_ADMIN)
    private readonly firebaseAdmin: admin.app.App,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  private getAccessToken() {
    return new Promise((resolve, reject) => {
      const MESSAGING_SCOPE = `https://www.googleapis.com/auth/firebase.messaging`;
      const SCOPES = [MESSAGING_SCOPE];
      const key = require(`./push-notification-google-service.json`);
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null,
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }

  async sendNotificationReal(
    userActivation: UserActivation,
    user: User,
    message: {
      notification: { title: string; body: string };
      data: { [key: string]: string };
    },
  ): Promise<void> {
    // await this.sendPushNotification(user.tokenFirebase.value, message);

    await this.sendPushNotification(user.id, user.tokenFirebase.value, message);
  }

  private sendFcmMessage({ fcmMessage }: { fcmMessage: any }) {
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
        // … plus the body of your notification or data message
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

  async sendPushNotification(
    userId: UserId,
    token: string,
    message: {
      notification: {
        title: string;
        body: string;
      };
      data: { [key: string]: string };
    },
  ) {
    const userBadge = await this.userRepository.search(userId);
    userBadge.badge = new UserBadge(userBadge.badge.value + 1);
    await this.userRepository.save(userBadge);
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${this.configService.get('FIREBASE_KEY')}`,
      },
    };

    const body = {
      notification: {
        ...message.notification,
        sound: 'default',
      },
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
      .pipe(
        map((response) => response.data),
        tap((response) => console.log('NotificationsService', response)),
      )
      .subscribe();
  }
}
