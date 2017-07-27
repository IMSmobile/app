import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { PlatformMock, StorageMock } from './../mocks/mocks';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { KeywordService } from './keyword-service';
import { SettingService } from './setting-service';

describe('Provider: ModelService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        KeywordService,
        AuthService,
        SettingService,
        { provide: Storage, useClass: StorageMock },
        { provide: Platform, useClass: PlatformMock },
        {
          provide: Http,
          useFactory: (imsBackendMock, options) =>
            new Http(imsBackendMock, options),
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    });
  });

  beforeEach(inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    authService.setCurrentCredential(imsBackendMock.credential);
  }));

  it('Should get keyword catalog', inject([KeywordService, ImsBackendMock], (keywordService: KeywordService, imsBackendMock: ImsBackendMock) => {
    keywordService.getKeywordCatalog(imsBackendMock.modelFieldOptionalString).subscribe(
      keywordCatalog => expect(keywordCatalog).toEqual(imsBackendMock.keywordCatalog),
      fail);
  }));

});
