import { ContainerUploadService } from './container-upload-service';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import { UploadService } from './upload-service';
import { TokenService } from './token-service';
import { ImsService } from './ims-service';
import { Entry } from '../models/entry';
import { Image } from '../models/image';
import { Transfer } from '@ionic-native/transfer';
import { TransferMock } from '../mocks/providers/transfer-mock';

describe('Provider: UploadService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        UploadService,
        TokenService,
        ImsService,
        ImsBackendMock,
        BaseRequestOptions,
        ContainerUploadService,
        { provide: Transfer, useClass: TransferMock },
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

  it('Should create a container location', inject([UploadService, ImsBackendMock], (uploadService: UploadService, imsBackendMock: ImsBackendMock) => {
    uploadService.createContainerLocation(imsBackendMock.credential, imsBackendMock.filterId, imsBackendMock.token).subscribe(
      location => expect(location).toEqual(imsBackendMock.uploadContainerUrl),
      err => fail(err)
    );
  }));

  it('Should upload image', inject([UploadService, ImsBackendMock], (uploadService: UploadService, imsBackendMock: ImsBackendMock) => {
    let imageEntry = new Entry().set('IDFall', '23691').set('BILDNAME', 'Imagic IMS Mobile Client');
    let image = new Image('image.jpg', '');
    uploadService.uploadImage(imsBackendMock.credential, imsBackendMock.filterId, imageEntry, image).subscribe(
      response => expect(response.headers.get('location')).toEqual(imsBackendMock.imageLocationUrl),
      err => fail(err)
    );
  }));
});
