import { ImsErrorHandler } from './../providers/ims-error-handler';
import { SettingArchivePage } from './../pages/setting-archive/setting-archive';
import { SettingEntriesFieldsPage } from './../pages/setting-entries-fields/setting-entries-fields';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ModelService } from './../providers/model-service';
import { SettingImageFieldsPage } from './../pages/setting-image-fields/setting-image-fields';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
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

import { EntriesService } from '../providers/entries-service';
import { CameraService } from '../providers/camera-service';
import { LoadingService } from '../providers/loading-service';
import { AlertService } from '../providers/alert-service';
import { QueryBuilderService } from './../providers/query-builder-service';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { AppProviders } from './app.providers';
import { FieldValidatorService } from '../providers/field-validator-service';
import { ImsFieldSelectionComponent } from '../components/ims-field-selection/ims-field-selection';

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
    MorePopoverPage,
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
    AppProviders.getTransferProvider(),
    AppProviders.getCameraProvider(),
    AppProviders.getContainerUploadServiceProvider(),
    SettingService,
    EntriesService,
    CameraService,
    LoadingService,
    AlertService,
    QueryBuilderService,
    ModelService,
    FieldValidatorService,
    { provide: ErrorHandler, useClass: ImsErrorHandler }
  ]
})
export class AppModule { }
