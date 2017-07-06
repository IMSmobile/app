import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Transfer } from '@ionic-native/transfer';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { TransferMock } from '../mocks/providers/transfer-mock';
import { Entry } from '../models/entry';
import { Image } from '../models/image';
import { ContainerUploadService } from './container-upload-service';
import { ImsService } from './ims-service';
import { TokenService } from './token-service';
import { UploadService } from './upload-service';

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
          useFactory: (imsBackendMock, options) => {
            return new Http(imsBackendMock, options);
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
    const imageEntry = new Entry().set('IDFall', '23691').set('BILDNAME', 'Imagic IMS Mobile Client');
    const image = new Image('image.jpg', '');
    uploadService.uploadImage(imsBackendMock.credential, imsBackendMock.filterId, imageEntry, image).subscribe(
      response => expect(response.headers.get('location')).toEqual(imsBackendMock.imageLocationUrl),
      err => fail(err)
    );
  }));
});
