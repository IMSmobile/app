import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SettingService } from './setting-service';

@Injectable()
export class BrowserSettingService extends SettingService {

  constructor(public storage: Storage) {
    super(storage);
  }

  public isPictureFromCameraEnabled(): boolean {
    return false;
  }
}
