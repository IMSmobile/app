import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MobileClient } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MorePopoverPage } from '../pages/more-popover/more-popover';
import { SettingsPage } from './../pages/settings/settings';
import { EntriesPage } from './../pages/entries/entries';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TokenService } from '../providers/token-service';
import { UploadService } from '../providers/upload-service';
import { ImsService } from '../providers/ims-service';
import { AuthService } from '../providers/auth-service';
import { SettingService } from '../providers/setting-service';

import { Transfer } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';
import { EntriesService } from '../providers/entries-service';
import { CameraService } from '../providers/camera-service';
import { LoadingService } from '../providers/loading-service';

@NgModule({
  declarations: [
    MobileClient,
    HomePage,
    LoginPage,
    MorePopoverPage,
    SettingsPage,
    EntriesPage
  ],
  imports: [
    IonicModule.forRoot(MobileClient),
    IonicStorageModule.forRoot({
      name: 'imsClientDB'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MobileClient,
    HomePage,
    LoginPage,
    MorePopoverPage,
    SettingsPage,
    EntriesPage
  ],
  providers: [
    TokenService,
    UploadService,
    ImsService,
    AuthService,
    StatusBar,
    SplashScreen,
    Transfer,
    IonicStorageModule,
    Camera,
    SettingService,
    EntriesService,
    CameraService,
    LoadingService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
