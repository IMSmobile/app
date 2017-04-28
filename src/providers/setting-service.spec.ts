import { StorageMock } from '../mocks/mocks';
import { Storage } from '@ionic/storage';
import { TestBed, inject, async } from '@angular/core/testing';
import { SettingService } from './setting-service';


describe('Provider: SettingService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],
      providers: [SettingService, { provide: Storage, useClass: StorageMock }],
      imports: []
    }).compileComponents();
  }));

  it('Should initialize with default values', inject([SettingService], (settingService: SettingService) => {
    settingService.isShowRestUrlField().subscribe(isShowRestUrlField => expect(isShowRestUrlField).toBe(settingService.isShowRestUrlFieldDefault));
  }));

  it('Settings should be written and read from store', async(inject([SettingService, Storage], (settingService: SettingService, storage: Storage) => {
    storage.set(settingService.restUrlKey, 'abc');
    storage.set(settingService.usernameKey, 'def');
    storage.set(settingService.isShowRestUrlFieldKey, false);

    settingService.getRestUrl().subscribe(restUrl => expect(restUrl).toBe('abc'));
    settingService.getUsername().subscribe(username => expect(username).toBe('def'));
    settingService.isShowRestUrlField().subscribe(isShowRestUrlField => expect(isShowRestUrlField).toBeFalsy());
  })));

  it('Settings should be written and removed from store', async(inject([SettingService, Storage], (settingService: SettingService, storage: Storage) => {
    storage.set(settingService.restUrlKey, 'abc');
    storage.set(settingService.usernameKey, 'def');
    storage.set(settingService.isShowRestUrlFieldKey, false);

    settingService.clearLoginData().subscribe(() => {
      storage.get(settingService.restUrlKey).then(restUrl =>  expect(restUrl).toBeNull);
      storage.get(settingService.usernameKey).then(userName => expect(userName).toBeNull);
      storage.get(settingService.isShowRestUrlFieldKey).then(isShowFieldUrl => expect(isShowFieldUrl).toBeNull);
    });

  })));
});
