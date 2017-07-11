import { Provider } from '@angular/core';
import { Http } from '@angular/http';
import { Transfer } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { TransferBlobMock } from './../mocks/providers/transfer-blob-mock';
import { BrowserContainerUploadService } from './../providers/browser-container-upload-service';
import { BrowserSettingService } from './../providers/browser-setting-service';
import { ContainerUploadService } from './../providers/container-upload-service';
import { SettingService } from './../providers/setting-service';

export class AppProviders {

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
