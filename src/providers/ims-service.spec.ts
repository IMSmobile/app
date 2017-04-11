import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';
import { EntryPoint } from '../model/entry-point';
import { Link } from '../model/link';
import { LicensePoint } from '../model/license-point';
import { EntryPointResponse } from '../model/test/entry-point-response';
import { LicensePointResponse } from '../model/test/license-point-response';


describe('Provider: ImsService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        ImsService,
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

  it('Ims Version', inject([ImsService, MockBackend], (imsService: ImsService, mockBackend) => {
    const mockResponse = { 'version': 'V17Q1' };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });
    imsService.getInfo(new Credential('', '', '')).subscribe(info => expect(info.version).toEqual('V17Q1'));
  }));

  it('Should get link to license resource', inject([ImsService, MockBackend], (imsService: ImsService, mockBackend) => {
    let licenseUrl = 'http://test/rest/license';
    mockBackend.connections.subscribe((connection) => connection.mockRespond(new EntryPointResponse([new Link('license', licenseUrl)])));
    imsService.getEntryPoint(new Credential('', '', '')).subscribe(
      entryPoint => expect(entryPoint.getLinkHref('license')).toEqual(licenseUrl),
      err => fail(err));
  }));

  it('Should get link to token resource', inject([ImsService, MockBackend], (imsService: ImsService, mockBackend) => {
    let licenseUrl = 'http://test/rest/license';
    let getTokensUrl = licenseUrl + '/tokens';
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.endsWith('/rest')) {
        connection.mockRespond(new EntryPointResponse([new Link('license', licenseUrl)]));
      } else if (connection.request.url.endsWith('/rest/license')) {
        connection.mockRespond(new LicensePointResponse(null, new Link('tokens', getTokensUrl)));
      }
    });
    imsService.getTokensUrl(new Credential('', '', '')).subscribe(
      link => expect(link).toEqual(getTokensUrl),
      err => fail(err)
    );
  }));
});
