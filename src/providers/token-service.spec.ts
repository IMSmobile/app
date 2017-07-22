import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { Token } from '../models/token';
import { PlatformMock, StorageMock } from './../mocks/mocks';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { SettingService } from './setting-service';
import { TokenService } from './token-service';

describe('Provider: TokenService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        TokenService,
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
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

  it('Should get Token Location for Segment Name', inject([TokenService, ImsBackendMock, AuthService], (tokenService: TokenService, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    tokenService.getTokenForSegment(authService.currentCredential.segmentName).subscribe(
      location => { expect(location).toEqual(imsBackendMock.tokenLoadingUrl); },
      fail);
  }));

  it('Should get Token from Url', inject([TokenService, ImsBackendMock], (tokenService: TokenService, imsBackendMock: ImsBackendMock) => {
    tokenService.getTokenFromUrl(imsBackendMock.tokenLoadingUrl).subscribe(
      token => expect(token.token).toEqual(imsBackendMock.tokenName),
      fail);
  }));

  it('Should load Token from Rest API', inject([TokenService, ImsBackendMock], (tokenService: TokenService, imsBackendMock: ImsBackendMock) => {
    tokenService.getToken().subscribe(
      token => expect(token.token).toEqual(imsBackendMock.tokenName),
      fail);
  }));

  it('Should load Token from Rest API and then from cache', inject([TokenService, ImsBackendMock], (tokenService: TokenService, imsBackendMock: ImsBackendMock) => {
    imsBackendMock.token = new Token(imsBackendMock.tokenName, '2080-10-28T16:45:12Z');
    const spy = spyOn(tokenService, 'getTokenForSegment').and.callThrough();
    tokenService.getToken().subscribe();
    tokenService.getToken().subscribe();
    expect(spy.calls.count()).toEqual(1);
  }));
});
