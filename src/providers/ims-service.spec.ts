import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { ImsService } from './ims-service';

describe('Provider: ImsService', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [],

      providers: [
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Ims Version', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getInfo(imsBackendMock.credential).subscribe(
      info => expect(info.version).toEqual(imsBackendMock.version),
      err => fail(err));
  }));

  it('Should get link to license resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getEntryPointLink(imsBackendMock.credential, 'license').subscribe(
      entryPoint => expect(entryPoint).toEqual(imsBackendMock.licenseUrl),
      err => fail(err));
  }));

  it('Should get link to entries resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getEntryPointLink(imsBackendMock.credential, 'entries').subscribe(
      entryPoint => expect(entryPoint).toEqual(imsBackendMock.entriesUrl),
      err => fail(err));
  }));

  it('Should get link to token resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getTokensUrl(imsBackendMock.credential).subscribe(
      link => expect(link).toEqual(imsBackendMock.tokensUrl),
      err => fail(err)
    );
  }));

  it('Should get link to filter resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getEntriesFilterUrl(imsBackendMock.credential, imsBackendMock.filterId).subscribe(
      link => expect(link).toEqual(imsBackendMock.filterResourceUrl),
      err => fail(err)
    );
  }));

  it('Should get an upload link', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getUploadsLink(imsBackendMock.credential, imsBackendMock.filterId, imsBackendMock.token).subscribe(
      url => expect(url).toEqual(imsBackendMock.containerRequestUrl),
      err => fail(err)
    );
  }));

  it('Should get parent image entries link', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getParentImageEntriesLink(imsBackendMock.credential, imsBackendMock.filterId, imsBackendMock.token).subscribe(
      url => expect(url).toEqual(imsBackendMock.parentImageEntriesUrl),
      err => fail(err)
    );
  }));

  it('Should get model archives', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getModelArchives(imsBackendMock.credential).subscribe(
      modelArchives => expect(modelArchives).toEqual(imsBackendMock.modelArchives),
      err => fail(err)
    );
  }));
});
