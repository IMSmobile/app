import { SettingService } from './setting-service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class BrowserSettingService extends SettingService {

  constructor(public storage: Storage) {
    super(storage);
  }

  isPictureFromCameraEnabled(): boolean {
    return false;
  }
}
