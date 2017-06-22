import { Storage } from '@ionic/storage';
import { BrowserSettingService } from './../providers/browser-setting-service';
import { SettingService } from './../providers/setting-service';
import { BrowserContainerUploadService } from './../providers/browser-container-upload-service';
import { ContainerUploadService } from './../providers/container-upload-service';
import { Http } from '@angular/http';
import { TransferBlobMock } from './../mocks/providers/transfer-blob-mock';
import { CameraMock } from './../mocks/providers/camera-mock';
import { Transfer } from '@ionic-native/transfer';
import { Provider } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

export class AppProviders {

  public static getCameraProvider(): Provider {
    return {
      provide: Camera, useFactory: (platform: Platform) => {
        if (this.deviceRunningCordova(platform)) {
          return new Camera();
        } else {
          return new CameraMock();
        }
      }, deps: [Platform]
    };
  }

  public static getTransferProvider(): Provider {
    return {
      provide: Transfer, useFactory: (http: Http, platform: Platform) => {
        if (this.deviceRunningCordova(platform)) {
          return new Transfer();
        } else {
          return new TransferBlobMock(http);
        }
      }, deps: [Http, Platform]
    };
  }

  public static getContainerUploadServiceProvider(): Provider {
    return {
      provide: ContainerUploadService, useFactory: (platform: Platform, transfer: Transfer, http: Http) => {
        if (this.deviceRunningBrowser(platform)) {
          return new BrowserContainerUploadService(http);
        } else {
          return new ContainerUploadService(transfer);
        }
      }, deps: [Platform, Transfer, Http]
    };
  }

  public static getSettingServiceProvider(): Provider {
    return {
      provide: SettingService, useFactory: (platform: Platform, storage: Storage) => {
        if (this.deviceRunningBrowser(platform)) {
          return new BrowserSettingService(storage);
        } else {
          return new SettingService(storage);
        }
      }, deps: [Platform, Storage]
    };
  }

  private static deviceRunningCordova(platform: Platform): boolean {
    return platform.is('cordova');
  }

  private static deviceRunningBrowser(platform: Platform): boolean {
    return platform.is('core');
  }
}
