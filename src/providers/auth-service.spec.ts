import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { Credential } from '../models/credential';
import { Info } from '../models/info';
import { StorageMock } from './../mocks/mocks';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { SettingService } from './setting-service';

describe('Provider: AuthService', () => {

  beforeEach(() => {
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
          useFactory: (imsBackendMock, options) =>
            new Http(imsBackendMock, options),
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    });
  });

  it('Should store credentials if succeed', inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    const credential = imsBackendMock.credential;
    authService.login(credential).subscribe(
      info => expect(authService.currentCredential.username).toEqual(credential.username),
      fail
    );
  }));

  it('Should not store credentials if failed', inject([AuthService, ImsBackendMock], (authService: AuthService, imsBackendMock: ImsBackendMock) => {
    const credential = new Credential('invalid', imsBackendMock.credential.username, imsBackendMock.credential.password);
    authService.login(credential).subscribe(
      info => fail('Should fail'),
      err => expect(authService.currentCredential).toBeUndefined()
    );
  }));

  it('Should clear credentials on logout', inject([AuthService], (authService: AuthService) => {
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, new Credential('https://test', 'testuser', 'testpass', 'testsegment'));
    authService.logout();
    expect(authService.currentCredential).toBeUndefined();
  }));

  it('Should store the filter after archive selection', inject([AuthService, SettingService, ImsBackendMock], (authService: AuthService, settingService: SettingService, imsBackendMock: ImsBackendMock) => {
    spyOn(settingService, 'setFilter').and.callThrough();
    const testInfo: Info = { version: '9000' };
    authService.setCurrentCredential(testInfo, new Credential('https://test', 'testuser', 'testpass', 'testsegment'));
    authService.setArchive(imsBackendMock.policeFilter);
    expect(settingService.setFilter).toHaveBeenCalledWith(authService.currentCredential.server, authService.currentCredential.username, imsBackendMock.policeFilter);
  }));
});
