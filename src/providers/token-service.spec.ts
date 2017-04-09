import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod, Headers, ResponseType } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TokenService } from './token-service';
import { Credential } from '../model/credential';
import { Token } from '../model/token';

describe('Provider: TokenSerivce', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        TokenService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Should get Token Location for Segment Name', inject([TokenService, MockBackend], (tokenSerivce: TokenService, mockBackend) => {
    let expectedLocation = "http://test/rest/tokens/ABCD";
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        headers: new Headers({ "location": expectedLocation })
      })));
    });
    tokenSerivce.getTokenForSegment(new Credential("", "", "")).subscribe(
      location => {
        expect(location).toEqual(expectedLocation)
      },
      err => fail(err));
  }));

  it('Should get Token from Url', inject([TokenService, MockBackend], (tokenSerivce: TokenService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: { "token": "abc", "licenseExpirationDate": "2015-10-28T16:45:12Z" }
      })));
    });
    tokenSerivce.getTokenFromUrl(new Credential("", "", ""), "http://test/rest/tokens/ABCD").subscribe(
      token => {
        expect(token.token).toEqual("abc");
      },
      err => fail(err));
  }));


  it('Should load Token from Rest API', inject([TokenService, MockBackend], (tokenSerivce: TokenService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.endsWith('/rest/license/tokens') && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({ "location": "http://test/rest/tokens/ABCD" })
        })));
      }
      else if (connection.request.url.endsWith('/rest/tokens/ABCD') && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: { "token": "abc", "licenseExpirationDate": "2015-10-28T16:45:12Z" }
        })));
      }
      else {
        connection.mockRespond(new Response(new ResponseOptions({ status: 500, type: ResponseType.Error })));
      }
    });
    tokenSerivce.getToken(new Credential("", "", "")).subscribe(
      token => {
        expect(token.token).toEqual("abc");
      },
      err => fail(err));
  }));

  it('Should load Token from Rest API and then from cache', inject([TokenService, MockBackend], (tokenSerivce: TokenService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.endsWith('/rest/license/tokens') && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({ "location": "http://test/rest/tokens/ABCD" })
        })));
      }
      else if (connection.request.url.endsWith('/rest/tokens/ABCD') && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: { "token": "abc", "licenseExpirationDate": "2080-10-28T16:45:12Z" }
        })));
      }
      else {
        connection.mockRespond(new Response(new ResponseOptions({ status: 500, type: ResponseType.Error })));
      }
    });
    const spy = spyOn(tokenSerivce, 'getTokenForSegment').and.callThrough();
    tokenSerivce.getToken(new Credential("", "", "")).subscribe();
    tokenSerivce.getToken(new Credential("", "", "")).subscribe();
    expect(spy.calls.count()).toEqual(1);
  }));

});