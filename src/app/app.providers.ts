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

  public static transferFactory(http: Http, platform: Platform): any {
    if (this.deviceRunningCordova(platform)) {
      return new Transfer();
    } else {
      return new TransferBlobMock(http);
    }
  }

  public static containerUploadFactory(platform: Platform, transfer: Transfer, http: Http): any {
    if (this.deviceRunningBrowser(platform)) {
      return new BrowserContainerUploadService(http);
    } else {
      return new ContainerUploadService(transfer);
    }
  }

  public static settingFactory(platform: Platform, storage: Storage): SettingService {
    if (this.deviceRunningBrowser(platform)) {
      return new BrowserSettingService(storage);
    } else {
      return new SettingService(storage);
    }
  }

  private static deviceRunningCordova(platform: Platform): boolean {
    return platform.is('cordova');
  }

  private static deviceRunningBrowser(platform: Platform): boolean {
    return platform.is('core');
  }
}
