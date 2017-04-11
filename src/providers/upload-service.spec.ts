import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod, Headers, ResponseType } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UploadService } from './upload-service';
import { TokenService } from './token-service';
import { Credential } from '../model/credential';
import { ImageEntry } from '../model/imageEntry';
import { Image } from '../model/image';

describe('Provider: UploadService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        UploadService,
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

  it('Should upload image', inject([UploadService, MockBackend], (uploadService: UploadService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.endsWith('/rest/license/tokens') && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response(new ResponseOptions({
          headers: new Headers({ 'location': 'http://test/rest/tokens/ABCD' })
        })));
      } else if (connection.request.url.endsWith('/rest/tokens/ABCD') && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: { 'token': 'abc', 'licenseExpirationDate': '2015-10-28T16:45:12Z' }
        })));
      } else {
        connection.mockRespond(new Response(new ResponseOptions({ status: 500, type: ResponseType.Error })));
      }
    });
    let credential = new Credential('', '', '');
    let imageEntry = new ImageEntry().set('IDFall', '23691').set('BILDNAME', 'IMS Mobile App');
    let image = new Image('image.jpg', new Blob());
    uploadService.uploadImage(credential, imageEntry, image); //TODO assert that image is uploaded 
  }));
});
