import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { FileUploadOptions, Transfer } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { ImsBackendMock } from '../mocks/ims-backend-mock';
import { TransferMock } from '../mocks/providers/transfer-mock';
import { PlatformMock, StorageMock } from './../mocks/mocks';
import { Image } from './../models/image';
import { ImsFileUploadHeaders } from './../models/ims-file-upload-headers';
import { AuthService } from './auth-service';
import { ContainerUploadService } from './container-upload-service';
import { SettingService } from './setting-service';

describe('Provider: ContainerUploadService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ContainerUploadService,
        BaseRequestOptions,
        ImsBackendMock,
        AuthService,
        SettingService,
        { provide: Storage, useClass: StorageMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: Transfer, useClass: TransferMock },
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

  it('Should post to a container', inject([ContainerUploadService, Transfer, ImsBackendMock, AuthService], (containerUploadService: ContainerUploadService, transfer: Transfer, imsBackendMock: ImsBackendMock, authService: AuthService) => {
    const image = new Image('a.jpg', '/dev/0');
    const fileTransfer = transfer.create();
    const url = imsBackendMock.baseUrl + '/uploadurl';
    authService.setCurrentCredential(imsBackendMock.credential);
    spyOn(transfer, 'create').and.returnValue(fileTransfer);
    spyOn(fileTransfer, 'upload').and.callThrough();
    const options: FileUploadOptions = {
      fileName: image.name,
      headers: new ImsFileUploadHeaders(imsBackendMock.credential, imsBackendMock.token, image.name)
    };
    containerUploadService.postToContainer(url, imsBackendMock.token, image).subscribe();
    expect(fileTransfer.upload).toHaveBeenCalledWith(image.fileURI, url, options);
  }));
});
