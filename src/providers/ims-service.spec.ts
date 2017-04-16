import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { ImsService } from './ims-service';
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

 it('Should get link to entries resource', inject([ImsService, MockImsBackend], (imsService: ImsService, mockImsBackend: MockImsBackend) => {
    imsService.getEntryPoint(mockImsBackend.credential).subscribe(
      entryPoint => expect(entryPoint.getLinkHref('entries')).toEqual(mockImsBackend.entriesUrl),
      err => fail(err));
  }));

  it('Should get link to token resource', inject([ImsService, MockImsBackend], (imsService: ImsService, mockImsBackend: MockImsBackend) => {
    imsService.getTokensUrl(mockImsBackend.credential).subscribe(
      link => expect(link).toEqual(mockImsBackend.tokensUrl),
      err => fail(err)
    );
  }));

  it('Should get link to filter resource', inject([ImsService, MockImsBackend], (imsService: ImsService, mockImsBackend: MockImsBackend) => {
    imsService.getEntriesFilterUrl(mockImsBackend.credential, mockImsBackend.filterId).subscribe(
      link => expect(link).toEqual(mockImsBackend.filterResourceUrl),
      err => fail(err)
    );
  }));
});
