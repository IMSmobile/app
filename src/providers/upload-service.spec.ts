import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions, RequestMethod, Headers } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UploadService } from './upload-service';
import { TokenService } from './token-service';
import { ImsService } from './ims-service';
import { Credential } from '../model/credential';
import { ImageEntry } from '../model/imageEntry';
import { Image } from '../model/image';
import { TokenLocationResponse } from '../model/test/tokenLocationResponse';
import { TokenResponse } from '../model/test/tokenResponse';
import { Token } from '../model/token';
import { ArchiveEntry } from '../model/archiveEntry';
import { ArchiveTableEntry } from '../model/archiveTableEntry';

describe('Provider: UploadService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        UploadService,
        TokenService,
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

  it('Should create a container location', inject([UploadService, MockBackend], (uploadService: UploadService, mockBackend) => {
    let expectedUploadLocation = 'http://server/rest/entries/40/Bild/uploads';
    let expectedContainerLocation = 'http://server/rest/entries/40/image/uploads/ABCD';
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.endsWith('/rest/entries/40') && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: new ArchiveEntry('workflow_db1', [new ArchiveTableEntry('Art'), new ArchiveTableEntry('Fall'), new ArchiveTableEntry('Bild', null, null, expectedUploadLocation)])
        })));
      } else if (connection.request.url.endsWith(expectedUploadLocation) && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response(new ResponseOptions({headers: new Headers({ 'location': expectedContainerLocation })})));
      } else {
        connection.mockError(new Error('fail'));
      }
    });
    let credential = new Credential('', '', '');
    let token = new Token('', '');
    uploadService.createContainerLocation(credential, 40, token).subscribe(
      location => expect(location).toEqual(expectedContainerLocation),
      err => fail(err)
    );
  }));


  it('Should get an archive entry', inject([UploadService, MockBackend], (uploadService: UploadService, mockBackend) => {
    let expectedUploadLocation = 'http://server/rest/entries/40/Bild/uploads';
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: new ArchiveEntry('workflow_db1', [new ArchiveTableEntry('Art'), new ArchiveTableEntry('Fall'), new ArchiveTableEntry('Bild', null, null, expectedUploadLocation)])
      })));
    });
    let credential = new Credential('', '', '');
    let token = new Token('', '');
    uploadService.getArchiveEntry(credential, 40, token).subscribe(
      entry => {
        expect(entry.getUploadsLink()).toEqual(expectedUploadLocation);
      },
      err => fail(err)
    );
  }));

  it('Should upload image', inject([UploadService, MockBackend], (uploadService: UploadService, mockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url.endsWith('/rest/license/tokens') && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new TokenLocationResponse( 'http://test/rest/tokens/ABCD'));
      } else if (connection.request.url.endsWith('/rest/tokens/ABCD') && connection.request.method === RequestMethod.Get) {
        connection.mockRespond(new TokenResponse(new Token('abc', '2015-10-28T16:45:12Z')));
      } else {
        connection.mockError(new Error('fail'));
      }
    });
    let credential = new Credential('', '', '');
    let imageEntry = new ImageEntry().set('IDFall', '23691').set('BILDNAME', 'IMS Mobile App');
    let image = new Image('image.jpg', new Blob());
    uploadService.uploadImage(credential, 40, imageEntry, image); // TODO assert that image is uploaded 
  }));
});

