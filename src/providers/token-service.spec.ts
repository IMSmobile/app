import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { Token } from '../models/token';
import { ImsService } from './ims-service';
import { TokenService } from './token-service';

describe('Provider: TokenService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        TokenService,
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (imsBackendMock, options) =>
            new Http(imsBackendMock, options),
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    });
  }));

  it('Should get Token Location for Segment Name', inject([TokenService, ImsBackendMock], (tokenService: TokenService, imsBackendMock: ImsBackendMock) => {
    tokenService.getTokenForSegment(imsBackendMock.credential).subscribe(
      location => { expect(location).toEqual(imsBackendMock.tokenLoadingUrl); },
      fail);
  }));

  it('Should get Token from Url', inject([TokenService, ImsBackendMock], (tokenService: TokenService, imsBackendMock: ImsBackendMock) => {
    tokenService.getTokenFromUrl(imsBackendMock.credential, imsBackendMock.tokenLoadingUrl).subscribe(
      token => expect(token.token).toEqual(imsBackendMock.tokenName),
      fail);
  }));

  it('Should load Token from Rest API', inject([TokenService, ImsBackendMock], (tokenService: TokenService, imsBackendMock: ImsBackendMock) => {
    tokenService.getToken(imsBackendMock.credential).subscribe(
      token => expect(token.token).toEqual(imsBackendMock.tokenName),
      fail);
  }));

  it('Should load Token from Rest API and then from cache', inject([TokenService, ImsBackendMock], (tokenService: TokenService, imsBackendMock: ImsBackendMock) => {
    imsBackendMock.token = new Token(imsBackendMock.tokenName, '2080-10-28T16:45:12Z');
    const spy = spyOn(tokenService, 'getTokenForSegment').and.callThrough();
    tokenService.getToken(imsBackendMock.credential).subscribe();
    tokenService.getToken(imsBackendMock.credential).subscribe();
    expect(spy.calls.count()).toEqual(1);
  }));
});
