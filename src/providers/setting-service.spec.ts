import { Filter } from './../models/filter';
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
    let testFilter = new Filter('href', 'id', 'name', 'archiveName');
    let testRestUrl = 'testUrl';
    let testUsername = 'testUser';
    settingService.setRestUrl(testRestUrl);
    settingService.setUsername(testUsername);
    settingService.setShowRestUrlField(false);
    settingService.setFilter(testRestUrl, testUsername, testFilter);

    settingService.getRestUrl().subscribe(restUrl => expect(restUrl).toBe(testRestUrl));
    settingService.getUsername().subscribe(username => expect(username).toBe(testUsername));
    settingService.isShowRestUrlField().subscribe(isShowRestUrlField => expect(isShowRestUrlField).toBeFalsy());
    settingService.getFilter(testRestUrl, testUsername).subscribe(filter => expect(filter).toEqual(testFilter));
  })));

  it('Field state should be read store', async(inject([SettingService, Storage], (settingService: SettingService, storage: Storage) => {
    storage.set(settingService.getFieldKey('archive', 'table', 'field1'), true);
    storage.set(settingService.getFieldKey('archive', 'table', 'field2'), false);

    settingService.getFieldState('archive', 'table', 'field1').subscribe(active => expect(active).toBeTruthy());
    settingService.getFieldState('archive', 'table', 'field2').subscribe(active => expect(active).toBeFalsy());

  })));

  it('Field key', async(inject([SettingService, Storage], (settingService: SettingService, storage: Storage) => {
    expect(settingService.getFieldKey('archive', 'table', 'field1')).toBe('archive.table.field1');
  })));

  it('picture from camera is enabled', (inject([SettingService, Storage], (settingService: SettingService) => {
    expect(settingService.isPictureFromCameraEnabled).toBeTruthy();
  })));
});
