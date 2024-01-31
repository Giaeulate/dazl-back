import { Global, Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import * as admin from 'firebase-admin';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import * as serviceAccount from '../../../../../push-notification-google-service.json';
import { ServiceAccount } from 'firebase-admin';
import { ConstantsFirebase } from '../constants/constants';

const firebaseConfig: Provider<app.App> = {
  provide: ConstantsFirebase.FIREBASE_ADMIN,
  useFactory: () => {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  },
};

@Global()
@Module({
  providers: [firebaseConfig],
  exports: [ConstantsFirebase.FIREBASE_ADMIN],
})
export class FirebaseModule {}
