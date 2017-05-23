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

  private static deviceRunningCordova(platform: Platform): boolean {
    return platform.is('cordova');
  }
}
