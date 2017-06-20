import { BrowserSettingService } from './browser-setting-service';
import { Filter } from './../models/filter';
import { StorageMock } from '../mocks/mocks';
import { Storage } from '@ionic/storage';
import { TestBed, inject, async } from '@angular/core/testing';
import { SettingService } from './setting-service';

describe('Provider: BrowserSettingService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: SettingService, useClass: BrowserSettingService }, { provide: Storage, useClass: StorageMock }],
      imports: []
    }).compileComponents();
  }));

  it('picture from camera is disabled', (inject([SettingService, Storage], (settingService: SettingService) => {
    expect(settingService.isPictureFromCameraEnabled()).toBeFalsy();
  })));
});
