import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { PlatformMock, StorageMock } from './../mocks/mocks';
import { AuthService } from './auth-service';
import { ImsService } from './ims-service';
import { SettingService } from './setting-service';

describe('Provider: ImsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
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

  it('Should get link to license resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getEntryPointLink('license').subscribe(
      entryPoint => expect(entryPoint).toEqual(imsBackendMock.licenseUrl),
      fail);
  }));

  it('Should get link to entries resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getEntryPointLink('entries').subscribe(
      entryPoint => expect(entryPoint).toEqual(imsBackendMock.entriesUrl),
      fail);
  }));

  it('Should get link to token resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getTokensUrl().subscribe(
      link => expect(link).toEqual(imsBackendMock.tokensUrl),
      fail
    );
  }));

  it('Should get link to filter resource', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getEntriesFilterUrl(imsBackendMock.filterId).subscribe(
      link => expect(link).toEqual(imsBackendMock.filterResourceUrl),
      fail
    );
  }));

  it('Should get an upload link', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getUploadsLink(imsBackendMock.filterId, imsBackendMock.token).subscribe(
      url => expect(url).toEqual(imsBackendMock.containerRequestUrl),
      fail
    );
  }));

  it('Should get parent image entries link', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getParentImageEntriesLink(imsBackendMock.filterId, imsBackendMock.token).subscribe(
      url => expect(url).toEqual(imsBackendMock.parentImageEntriesUrl),
      fail
    );
  }));

  it('Should get model archives', inject([ImsService, ImsBackendMock], (imsService: ImsService, imsBackendMock: ImsBackendMock) => {
    imsService.getModelArchives().subscribe(
      modelArchives => expect(modelArchives).toEqual(imsBackendMock.modelArchives),
      fail
    );
  }));
});
