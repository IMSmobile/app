import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';
import { Link } from '../model/link';
import { EntryPointResponse } from '../model/test/entry-point-response';
import { LicensePointResponse } from '../model/test/license-point-response';
import { MockImsBackend } from '../model/test/mock-ims-backend';

describe('Provider: ImsService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        ImsService,
        MockImsBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));


  it('Ims Version', inject([ImsService, MockImsBackend], (imsService: ImsService, mockImsBackend: MockImsBackend) => {
      imsService.getInfo(mockImsBackend.credential).subscribe(info => expect(info.version).toEqual(mockImsBackend.version));
  }));

  it('Should get link to license resource', inject([ImsService, MockImsBackend], (imsService: ImsService, mockImsBackend: MockImsBackend) => {
    imsService.getEntryPoint(mockImsBackend.credential).subscribe(
      entryPoint => expect(entryPoint.getLinkHref('license')).toEqual(mockImsBackend.licenseUrl),
      err => fail(err));
  }));

  it('Should get link to token resource', inject([ImsService, MockImsBackend], (imsService: ImsService, mockImsBackend: MockImsBackend) => {
    imsService.getTokensUrl(mockImsBackend.credential).subscribe(
      link => expect(link).toEqual(mockImsBackend.tokensUrl),
      err => fail(err)
    );
  }));
});
