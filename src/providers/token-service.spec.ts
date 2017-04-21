import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { MockImsBackend } from '../mocks/mock-ims-backend';
import { TokenService } from './token-service';
import { ImsService } from './ims-service';
import { Token } from '../model/token';

describe('Provider: TokenService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        TokenService,
        ImsService,
        MockImsBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (MockImsBackend, options) => {
            return new Http(MockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Should get Token Location for Segment Name', inject([TokenService, MockImsBackend], (tokenService: TokenService, mockImsBackend: MockImsBackend) => {
    tokenService.getTokenForSegment(mockImsBackend.credential).subscribe(
      location => { expect(location).toEqual(mockImsBackend.tokenLoadingUrl); },
      err => fail(err));
  }));

  it('Should get Token from Url', inject([TokenService, MockImsBackend], (tokenService: TokenService, mockImsBackend: MockImsBackend) => {
    tokenService.getTokenFromUrl(mockImsBackend.credential, mockImsBackend.tokenLoadingUrl).subscribe(
      token => expect(token.token).toEqual(mockImsBackend.tokenName),
      err => fail(err));
  }));


  it('Should load Token from Rest API', inject([TokenService, MockImsBackend], (tokenService: TokenService, mockImsBackend: MockImsBackend) => {
    tokenService.getToken(mockImsBackend.credential).subscribe(
      token => expect(token.token).toEqual(mockImsBackend.tokenName),
      err => fail(err));
  }));

  it('Should load Token from Rest API and then from cache', inject([TokenService, MockImsBackend], (tokenService: TokenService, mockImsBackend: MockImsBackend) => {
    mockImsBackend.token = new Token(mockImsBackend.tokenName, '2080-10-28T16:45:12Z');
    const spy = spyOn(tokenService, 'getTokenForSegment').and.callThrough();
    tokenService.getToken(mockImsBackend.credential).subscribe();
    tokenService.getToken(mockImsBackend.credential).subscribe();
    expect(spy.calls.count()).toEqual(1);
  }));
});
