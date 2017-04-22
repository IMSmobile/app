import { MockImsBackend } from '../mocks/mock-ims-backend';
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { UploadService } from './upload-service';
import { TokenService } from './token-service';
import { ImsService } from './ims-service';
import { ImageEntry } from '../models/imageEntry';
import { Image } from '../models/image';
import { Transfer } from '@ionic-native/transfer';
import { MockTransfer } from '../mocks/providers/mock-transfer';

describe('Provider: UploadService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        UploadService,
        TokenService,
        ImsService,
        MockImsBackend,
        BaseRequestOptions,
        { provide: Transfer, useClass: MockTransfer },
        {
          provide: Http,
          useFactory: (mockImsBackend, options) => {
            return new Http(mockImsBackend, options);
          },
          deps: [MockImsBackend, BaseRequestOptions]
        }
      ],
      imports: [HttpModule]
    }).compileComponents();
  }));


  it('Should get an archive entry', inject([UploadService, MockImsBackend], (uploadService: UploadService, mockImsBackend: MockImsBackend) => {
    uploadService.getArchiveEntry(mockImsBackend.credential, mockImsBackend.filterId, mockImsBackend.token).subscribe(
      entry => expect(entry.getUploadsLink()).toEqual(mockImsBackend.containerRequestUrl),
      err => fail(err)
    );
  }));

  it('Should create a container location', inject([UploadService, MockImsBackend], (uploadService: UploadService, mockImsBackend: MockImsBackend) => {
    uploadService.createContainerLocation(mockImsBackend.credential, mockImsBackend.filterId, mockImsBackend.token).subscribe(
      location => expect(location).toEqual(mockImsBackend.uploadContainerUrl),
      err => fail(err)
    );
  }));


  it('Should upload image', inject([UploadService, MockImsBackend], (uploadService: UploadService, mockImsBackend: MockImsBackend) => {
    let imageEntry = new ImageEntry().set('IDFall', '23691').set('BILDNAME', 'IMS Mobile App');
    let image = new Image('image.jpg', '');
    uploadService.uploadImage(mockImsBackend.credential, mockImsBackend.filterId, imageEntry, image).subscribe(
      response => expect(response.headers.get('location')).toEqual(mockImsBackend.imageLocationUrl),
      err => fail(err)
    );
  }));
});

