import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { PlatformMock, StorageMock } from './../mocks/mocks';
import { Image } from './../models/image';
import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { AuthService } from './auth-service';
import { BrowserContainerUploadService } from './browser-container-upload-service';
import { SettingService } from './setting-service';

describe('Provider: BrowserContainerUploadService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        BrowserContainerUploadService,
        BaseRequestOptions,
        ImsBackendMock,
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

  it('Should post to a container', inject([BrowserContainerUploadService, Http, ImsBackendMock, AuthService], (browserContainerUploadService: BrowserContainerUploadService, http: Http, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    const file = new File([new Blob([])], 'a.jpg');
    const image = new Image(undefined, undefined, file);
    const url = imsBackendMock.uploadContainerUrl;
    authService.setCurrentCredential(imsBackendMock.credential);
    spyOn(http, 'post').and.callThrough();
    const options = new RequestOptions({ headers: new ImsFileUploadHeaders(imsBackendMock.credential, imsBackendMock.token, file.name) });
    browserContainerUploadService.postToContainer(url, imsBackendMock.token, image).subscribe();
    expect(http.post).toHaveBeenCalledWith(url, file, options);
  }));
});
