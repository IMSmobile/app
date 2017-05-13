import { ModelService } from './../providers/model-service';
import { SettingImageFieldsPage } from './../pages/setting-image-fields/setting-image-fields';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MobileClient } from './app.component';
import { UploadPage } from '../pages/upload/upload';
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
import { AlertService } from '../providers/alert-service';
import { QueryBuilderService } from './../providers/query-builder-service';

import {CloudSettings, CloudModule} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4f2a84b8'
  }
};

@NgModule({
  declarations: [
    MobileClient,
    UploadPage,
    LoginPage,
    MorePopoverPage,
    SettingsPage,
    EntriesPage,
    SettingImageFieldsPage
  ],
  imports: [
    IonicModule.forRoot(MobileClient),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot({
      name: 'imsClientDB'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MobileClient,
    UploadPage,
    LoginPage,
    MorePopoverPage,
    SettingsPage,
    EntriesPage,
    SettingImageFieldsPage
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
    AlertService,
    QueryBuilderService,
    ModelService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
