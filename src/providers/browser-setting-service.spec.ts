import { async, inject, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { StorageMock } from '../mocks/mocks';
import { BrowserSettingService } from './browser-setting-service';
import { SettingService } from './setting-service';

describe('Provider: BrowserSettingService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: SettingService, useClass: BrowserSettingService }, { provide: Storage, useClass: StorageMock }],
      imports: []
    });
  }));

  it('picture from camera is disabled', (inject([SettingService, Storage], (settingService: SettingService) => {
    expect(settingService.isPictureFromCameraEnabled()).toBeFalsy();
  })));
});
