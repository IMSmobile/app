import { BrowserContainerUploadService } from './browser-container-upload-service';
import { Http, HttpModule, BaseRequestOptions, RequestOptions } from '@angular/http';
import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { Image } from './../models/image';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { TestBed, inject, async } from '@angular/core/testing';

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
          useFactory: (mockImsBackend, options) => {
            return new Http(mockImsBackend, options);
          },
          deps: [ImsBackendMock, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('Should post to a container', inject([BrowserContainerUploadService, Http, ImsBackendMock], (browserContainerUploadService: BrowserContainerUploadService, http: Http, imsBackendMock: ImsBackendMock) => {
    const file = new File([new Blob([])], 'a.jpg');
    const image = new Image(null, null, file);
    const url = imsBackendMock.uploadContainerUrl;
    spyOn(http, 'post').and.callThrough();
    const options = new RequestOptions({ headers: new ImsFileUploadHeaders(imsBackendMock.credential, imsBackendMock.token, file.name) });
    browserContainerUploadService.postToContainer(imsBackendMock.credential, url, imsBackendMock.token, image).subscribe();
    expect(http.post).toHaveBeenCalledWith(url, file, options);
  }));
});
