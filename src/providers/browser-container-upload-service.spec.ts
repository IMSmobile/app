import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestOptions } from '@angular/http';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { Image } from './../models/image';
import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { BrowserContainerUploadService } from './browser-container-upload-service';

describe('Provider: BrowserContainerUploadService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        BrowserContainerUploadService,
        BaseRequestOptions,
        ImsBackendMock,
        {
          provide: Http,
          useFactory: (imsBackendMock, options) =>
            new Http(imsBackendMock, options),
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Should post to a container', inject([BrowserContainerUploadService, Http, ImsBackendMock], (browserContainerUploadService: BrowserContainerUploadService, http: Http, imsBackendMock: ImsBackendMock) => {
    const file = new File([new Blob([])], 'a.jpg');
    const image = new Image(undefined, undefined, file);
    const url = imsBackendMock.uploadContainerUrl;
    spyOn(http, 'post').and.callThrough();
    const options = new RequestOptions({ headers: new ImsFileUploadHeaders(imsBackendMock.credential, imsBackendMock.token, file.name) });
    browserContainerUploadService.postToContainer(imsBackendMock.credential, url, imsBackendMock.token, image).subscribe();
    expect(http.post).toHaveBeenCalledWith(url, file, options);
  }));
});
