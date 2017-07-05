import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { UploadPage } from '../pages/upload/upload';
import { EntriesPage } from './../pages/entries/entries';
import { SettingArchivePage } from './../pages/setting-archive/setting-archive';
import { SettingEntriesFieldsPage } from './../pages/setting-entries-fields/setting-entries-fields';
import { SettingImageFieldsPage } from './../pages/setting-image-fields/setting-image-fields';
import { SettingsPage } from './../pages/settings/settings';
import { BrowserFileuploadSelectorService } from './../providers/browser-fileupload-selector-service';
import { ImsErrorHandler } from './../providers/ims-error-handler';
import { ModelService } from './../providers/model-service';
import { MobileClient } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthService } from '../providers/auth-service';
import { ImsService } from '../providers/ims-service';
import { TokenService } from '../providers/token-service';
import { UploadService } from '../providers/upload-service';

import { AlertService } from '../providers/alert-service';
import { CameraService } from '../providers/camera-service';
import { EntriesService } from '../providers/entries-service';
import { LoadingService } from '../providers/loading-service';
import { QueryBuilderService } from './../providers/query-builder-service';

import { CloudModule, CloudSettings } from '@ionic/cloud-angular';
import { ImsFieldSelectionComponent } from '../components/ims-field-selection/ims-field-selection';
import { FieldValidatorService } from '../providers/field-validator-service';
import { AppProviders } from './app.providers';

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
    SettingsPage,
    EntriesPage,
    SettingImageFieldsPage,
    SettingEntriesFieldsPage,
    ImsFieldSelectionComponent,
    SettingArchivePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MobileClient, {
      platforms: {
        ios: { backButtonText: 'Zurück' }
      }
    }),
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
    SettingsPage,
    EntriesPage,
    SettingImageFieldsPage,
    SettingEntriesFieldsPage,
    SettingArchivePage
  ],
  providers: [
    TokenService,
    UploadService,
    ImsService,
    AuthService,
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    Camera,
    AppProviders.getTransferProvider(),
    AppProviders.getContainerUploadServiceProvider(),
    AppProviders.getSettingServiceProvider(),
    EntriesService,
    CameraService,
    LoadingService,
    AlertService,
    QueryBuilderService,
    ModelService,
    FieldValidatorService,
    BrowserFileuploadSelectorService,
    { provide: ErrorHandler, useClass: ImsErrorHandler }
  ]
})
export class AppModule { }
