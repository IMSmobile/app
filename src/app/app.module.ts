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
<<<<<<< HEAD
import { Transfer } from '@ionic-native/transfer';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

=======
>>>>>>> 8b22bd2377f2bd2131e95368bad60c888c70143a


@NgModule({
  declarations: [
    MobileClient,
    HomePage,
    LoginPage
  ],
  imports: [
<<<<<<< HEAD
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MobileClient)
=======
    IonicModule.forRoot(MyApp)
>>>>>>> 8b22bd2377f2bd2131e95368bad60c888c70143a
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
