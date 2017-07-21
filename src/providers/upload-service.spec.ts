import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { Transfer } from '@ionic-native/transfer';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { TransferMock } from '../mocks/providers/transfer-mock';
import { Entry } from '../models/entry';
import { Image } from '../models/image';
import { AuthServiceMock } from './../mocks/providers/auth-service-mock';
import { AuthService } from './auth-service';
import { ContainerUploadService } from './container-upload-service';
import { ImsService } from './ims-service';
import { TokenService } from './token-service';
import { UploadService } from './upload-service';

describe('Provider: UploadService', () => {

  beforeEach(() => {
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
        { provide: AuthService, useClass: AuthServiceMock },
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

  it('Should create a container location', inject([UploadService, ImsBackendMock], (uploadService: UploadService, imsBackendMock: ImsBackendMock) => {
    uploadService.createContainerLocation(imsBackendMock.filterId, imsBackendMock.token).subscribe(
      location => expect(location).toEqual(imsBackendMock.uploadContainerUrl),
      fail);
  }));

  it('Should upload image', inject([UploadService, ImsBackendMock], (uploadService: UploadService, imsBackendMock: ImsBackendMock) => {
    const imageEntry = new Entry().set('IDFall', '23691').set('BILDNAME', 'Imagic IMS Mobile Client');
    const image = new Image('image.jpg', '');
    uploadService.uploadImage(imsBackendMock.filterId, imageEntry, image).subscribe(
      response => expect(response.headers.get('location')).toEqual(imsBackendMock.imageLocationUrl),
      fail);
  }));
});
