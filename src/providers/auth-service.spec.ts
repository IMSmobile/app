import { Storage } from '@ionic/storage';
import { StorageMock } from './../mocks/mocks';
import { SettingService } from './setting-service';
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { Credential } from '../models/credential';
import { Info } from '../models/info';

describe('Provider: AuthService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        AuthService,
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        SettingService,
        { provide: Storage, useClass: StorageMock },
        {
          provide: Http,
          useFactory: (ImsBackendMock, options) => {
            return new Http(ImsBackendMock, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Should store credentials if succeed', inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    let credential = imsBackendMock.credential;
    authService.login(credential).subscribe(
      info => expect(authService.currentCredential.username).toEqual(credential.username),
      err => fail(err)
    );
  }));

  it('Should not store credentials if failed', inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    let credential = imsBackendMock.credential;
    credential.server = credential.server + 'failed';
    authService.login(credential).subscribe(
      info => fail('Should fail'),
      err => expect(authService.currentCredential).toBeUndefined()
    );
  }));

  it('Should clear credentials on logout', inject([AuthService], (authService: AuthService) => {
    let testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, new Credential('https://test', 'testuser', 'testpass', 'testsegment'));
    authService.logout();
    expect(authService.currentCredential).toBeNull();
  }));

  it('Should store the filter after archive selection', inject([AuthService, SettingService, ImsBackendMock], (authService: AuthService, settingService: SettingService, imsBackendMock: ImsBackendMock) => {
    spyOn(settingService, 'setFilter').and.callThrough();
    authService.setArchive(imsBackendMock.policeFilter);
    expect(settingService.setFilter).toHaveBeenCalledWith(imsBackendMock.policeFilter);
  }));
});
