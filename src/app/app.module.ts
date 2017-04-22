import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MobileClient } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TokenService } from '../providers/token-service';
import { UploadService } from '../providers/upload-service';
import { ImsService } from '../providers/ims-service';
import { AuthService } from '../providers/auth-service';
import { Transfer } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MobileClient,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MobileClient)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MobileClient,
    HomePage,
    LoginPage
  ],
  providers: [
    TokenService,
    UploadService,
    ImsService,
    AuthService,
    StatusBar,
    SplashScreen,
    Transfer,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
