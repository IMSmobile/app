import { Http } from '@angular/http';
import { Transfer } from '@ionic-native/transfer';
import { Deploy } from '@ionic/cloud-angular';
import { Platform } from 'ionic-angular';
import { TransferBlobMock } from './../mocks/providers/transfer-blob-mock';
import { AuthService } from './../providers/auth-service';
import { BrowserContainerUploadService } from './../providers/browser-container-upload-service';
import { BrowserUpdateService } from './../providers/browser-update-service';
import { ContainerUploadService } from './../providers/container-upload-service';
import { UpdateService } from './../providers/update-service';

export class AppProviders {

  public static transferFactory(http: Http, platform: Platform): Transfer | TransferBlobMock {
    if (platform.is('cordova')) {
      return new Transfer();
    } else {
      return new TransferBlobMock(http);
    }
  }

  public static updateServiceFactory(platform: Platform, deploy: Deploy): UpdateService | BrowserUpdateService {
    if (platform.is('core')) {
      return new BrowserUpdateService();
    } else {
      return new UpdateService(deploy);
    }
  }

  public static containerUploadFactory(platform: Platform, transfer: Transfer, http: Http, authService: AuthService): BrowserContainerUploadService | ContainerUploadService {
    if (platform.is('core')) {
      return new BrowserContainerUploadService(http, authService);
    } else {
      return new ContainerUploadService(transfer, authService);
    }
  }
}
